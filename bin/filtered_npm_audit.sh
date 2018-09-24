#!/bin/bash

set -ue

# This script does platform detection, downloads audit-filter, and runs it.
#
# Platform detection and dependent functions from rustup-init.sh which is:
#
# Copyright 2016 The Rust Project Developers. See the COPYRIGHT
# file at the top-level directory of this distribution and at
# http://rust-lang.org/COPYRIGHT.
#
# Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
# http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
# <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
# option. This file may not be copied, modified, or distributed
# except according to those terms.


need_cmd() {
    if ! check_cmd "$1"
    then err "need '$1' (command not found)"
    fi
}

check_cmd() {
    command -v "$1" > /dev/null 2>&1
    return $?
}

err() {
    say "$1" >&2
    exit 1
}

say() {
    echo "filtered_npm_audit.sh: $1"
}

assert_nz() {
    if [ -z "$1" ]; then err "assert_nz $2"; fi
}

# This wraps curl or wget. Try curl first, if not installed,
# use wget instead.
downloader() {
    if check_cmd curl
    then _dld=curl
    elif check_cmd wget
    then _dld=wget
    else _dld='curl or wget' # to be used in error message of need_cmd
    fi

    if [ "$1" = --check ]
    then need_cmd "$_dld"
    elif [ "$_dld" = curl ]
    then curl -sSfL "$1" -o "$2"
    elif [ "$_dld" = wget ]
    then wget "$1" -O "$2"
    else err "Unknown downloader"   # should not reach here
    fi
}

get_bitness() {
    need_cmd head
    # Architecture detection without dependencies beyond coreutils.
    # ELF files start out "\x7fELF", and the following byte is
    #   0x01 for 32-bit and
    #   0x02 for 64-bit.
    # The printf builtin on some shells like dash only supports octal
    # escape sequences, so we use those.
    local _current_exe_head=$(head -c 5 /proc/self/exe )
    if [ "$_current_exe_head" = "$(printf '\177ELF\001')" ]; then
        echo 32
    elif [ "$_current_exe_head" = "$(printf '\177ELF\002')" ]; then
        echo 64
    else
        err "unknown platform bitness"
    fi
}

get_endianness() {
    local cputype=$1
    local suffix_eb=$2
    local suffix_el=$3

    # detect endianness without od/hexdump, like get_bitness() does.
    need_cmd head
    need_cmd tail

    local _current_exe_endianness="$(head -c 6 /proc/self/exe | tail -c 1)"
    if [ "$_current_exe_endianness" = "$(printf '\001')" ]; then
        echo "${cputype}${suffix_el}"
    elif [ "$_current_exe_endianness" = "$(printf '\002')" ]; then
        echo "${cputype}${suffix_eb}"
    else
        err "unknown platform endianness"
    fi
}

get_architecture() {

    local _ostype="$(uname -s)"
    local _cputype="$(uname -m)"

    if [ "$_ostype" = Linux ]; then
        if [ "$(uname -o)" = Android ]; then
            local _ostype=Android
        fi
    fi

    if [ "$_ostype" = Darwin -a "$_cputype" = i386 ]; then
        # Darwin `uname -s` lies
        if sysctl hw.optional.x86_64 | grep -q ': 1'; then
            local _cputype=x86_64
        fi
    fi

    case "$_ostype" in

        Android)
            local _ostype=linux-android
            ;;

        Linux)
            local _ostype=unknown-linux-gnu
            ;;

        FreeBSD)
            local _ostype=unknown-freebsd
            ;;

        NetBSD)
            local _ostype=unknown-netbsd
            ;;

        DragonFly)
            local _ostype=unknown-dragonfly
            ;;

        Darwin)
            local _ostype=apple-darwin
            ;;

        MINGW* | MSYS* | CYGWIN*)
            local _ostype=pc-windows-gnu
            ;;

        *)
            err "unrecognized OS type: $_ostype"
            ;;

    esac

    case "$_cputype" in

        i386 | i486 | i686 | i786 | x86)
            local _cputype=i686
            ;;

        xscale | arm)
            local _cputype=arm
            if [ "$_ostype" = "linux-android" ]; then
                local _ostype=linux-androideabi
            fi
            ;;

        armv6l)
            local _cputype=arm
            if [ "$_ostype" = "linux-android" ]; then
                local _ostype=linux-androideabi
            else
                local _ostype="${_ostype}eabihf"
            fi
            ;;

        armv7l | armv8l)
            local _cputype=armv7
            if [ "$_ostype" = "linux-android" ]; then
                local _ostype=linux-androideabi
            else
                local _ostype="${_ostype}eabihf"
            fi
            ;;

        aarch64)
            local _cputype=aarch64
            ;;

        x86_64 | x86-64 | x64 | amd64)
            local _cputype=x86_64
            ;;

        mips)
            local _cputype="$(get_endianness $_cputype "" 'el')"
            ;;

        mips64)
            local _bitness="$(get_bitness)"
            if [ $_bitness = "32" ]; then
                if [ $_ostype = "unknown-linux-gnu" ]; then
                    # 64-bit kernel with 32-bit userland
                    # endianness suffix is appended later
                    local _cputype=mips
                fi
            else
                # only n64 ABI is supported for now
                local _ostype="${_ostype}abi64"
            fi

            local _cputype="$(get_endianness $_cputype "" 'el')"
            ;;

        ppc)
            local _cputype=powerpc
            ;;

        ppc64)
            local _cputype=powerpc64
            ;;

        ppc64le)
            local _cputype=powerpc64le
            ;;

        *)
            err "unknown CPU type: $_cputype"

    esac

    # Detect 64-bit linux with 32-bit userland
    if [ $_ostype = unknown-linux-gnu -a $_cputype = x86_64 ]; then
        if [ "$(get_bitness)" = "32" ]; then
            local _cputype=i686
        fi
    fi

    # Detect armv7 but without the CPU features Rust needs in that build,
    # and fall back to arm.
    # See https://github.com/rust-lang-nursery/rustup.rs/issues/587.
    if [ $_ostype = "unknown-linux-gnueabihf" -a $_cputype = armv7 ]; then
        if ensure grep '^Features' /proc/cpuinfo | grep -q -v neon; then
            # At least one processor does not have NEON.
            local _cputype=arm
        fi
    fi

    local _arch="$_cputype-$_ostype"

    RETVAL="$_arch"
}

check_ci() {
    if [ -z ${CI+0} ]; then
    	echo "Skipping dep lint. (set CI != 0 to run locally)";
    	exit 0
    fi
}

main() {
    downloader --check
    need_cmd uname
    need_cmd chmod
    need_cmd npm
    check_ci

    get_architecture || return 1
    local _sha256
    local _arch="$RETVAL"
    assert_nz "$_arch" "arch"

    say "Detected architecture ${_arch}"
    if [[ $_arch == x86_64-unknown-linux* ]]; then
	_arch=x86_64-unknown-linux-musl
	_sha256=0f0cbb0edb582a2d6c74b44e10e7ad1abf00497a4afbe791cdca88cca3c1cbdf
    elif [[ $_arch == i686-unknown-linux* ]]; then
	_arch=i686-unknown-linux-musl
	_sha256=916a41c405e05d720f90a8137e92783dc4bcff01108878980e0f32dd87160000
    elif [[ $_arch != x86_64-apple-darwin ]]; then
	err "Unsupported architecture $_arch"
    else
	# x86_64-apple-darwin
	_sha256=be977a1937e6eb4542ac19896a3ec100c6dab3cba58b1632779f8e4b1f57ef11
    fi
    say "Fetching tarball for architecture ${_arch} w/ sha256: ${_sha256}"

    local _tag=0.2.5
    local _basename=audit-filter-${_tag}-${_arch}
    local _file=${_basename}.tar.gz
    local _url=https://github.com/mozilla-services/audit-filter/releases/download/${_tag}/${_basename}.tar.gz

    cd bin/
    test -f ${_file} || downloader "$_url" "$_file"
    test -f ${_basename}/audit-filter || tar xvzf ${_file} ${_basename}/audit-filter > /dev/null
    echo "${_sha256} ${_basename}/audit-filter" | sha256sum -c - > /dev/null || exit 1

    chmod +x ${_basename}/audit-filter
    say "Extracted bin/${_file}/audit-filter with expected sha256"
    cd -

    local _npm=$(npm prefix -g)/bin/npm
    say "Using npm at: ${_npm} with version: $($_npm --version)"
    set -v
    $_npm audit --json | bin/${_basename}/audit-filter --nsp-config .nsprc
}

main "$@" || exit 1
