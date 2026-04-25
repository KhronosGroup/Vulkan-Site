# API Boilerplate

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/boilerplate.html

## Table of Contents

- [Vulkan Header Files](#boilerplate-headers)
- [Vulkan_Header_Files](#boilerplate-headers)
- [Vulkan Combined API Header vulkan.h (Informative)](#boilerplate-vulkan-h)
- [Vulkan_Combined_API_Header_vulkan.h_(Informative)](#boilerplate-vulkan-h)
- [Vulkan_Platform-Specific_Header_vk_platform.h_(Informative)](#boilerplate-platform-macros)
- [Platform-Specific Calling Conventions](#boilerplate-platform-specific-calling-conventions)
- [Platform-Specific_Calling_Conventions](#boilerplate-platform-specific-calling-conventions)
- [Platform-Specific Header Control](#boilerplate-platform-specific-header-control)
- [Platform-Specific_Header_Control](#boilerplate-platform-specific-header-control)
- [Vulkan_Core_API_Header_vulkan_core.h](#boilerplate-vulkan-core)
- [Vulkan Header File Compile Time Controls](#_vulkan_header_file_compile_time_controls)
- [Vulkan_Header_File_Compile_Time_Controls](#_vulkan_header_file_compile_time_controls)
- [Vulkan Header File Version Number](#_vulkan_header_file_version_number)
- [Vulkan_Header_File_Version_Number](#_vulkan_header_file_version_number)
- [Vulkan Handle Macros](#_vulkan_handle_macros)
- [Vulkan_Handle_Macros](#_vulkan_handle_macros)
- [Window System-Specific Header Control (Informative)](#boilerplate-wsi-header)
- [Window_System-Specific_Header_Control_(Informative)](#boilerplate-wsi-header)
- [Provisional Extension Header Control (Informative)](#boilerplate-provisional-header)
- [Provisional_Extension_Header_Control_(Informative)](#boilerplate-provisional-header)
- [Video Std Headers](#boilerplate-video-std-headers)
- [Video_Std_Headers](#boilerplate-video-std-headers)

## Content

This appendix defines Vulkan API features that are infrastructure required
for a complete functional description of Vulkan, but do not logically belong
elsewhere in the Specification.

Vulkan is defined as an API in the C99 language.
Khronos provides a corresponding set of header files for applications using
the API, which may be used in either C or C++ code.
The interface descriptions in the specification are the same as the
interfaces defined in these header files, and both are derived from the
`vk.xml` XML API Registry, which is the canonical machine-readable
description of the Vulkan API.
The Registry, scripts used for processing it into various forms, and
documentation of the registry schema are available as described at
[https://registry.khronos.org/vulkan/#apiregistry](https://registry.khronos.org/vulkan/#apiregistry) .

Language bindings for other languages can be defined using the information
in the Specification and the Registry.
Khronos does not provide any such bindings, but third-party developers have
created some additional bindings.

Applications normally will include the header `vulkan.h`.
In turn, `vulkan.h` always includes the following headers:

* 
[`vk_platform.h`](#boilerplate-platform-macros), defining
platform-specific macros and headers.

* 
[`vulkan_core.h`](#boilerplate-vulkan-core), defining APIs for the
Vulkan core and all registered extensions *other* than
[window system-specific](#boilerplate-wsi-header) and
[provisional](#boilerplate-provisional-header) extensions, which are
included in separate header files.

In addition, specific preprocessor macros defined at the time
`vulkan.h` is included cause header files for the corresponding window
system-specific and provisional interfaces to be included, as described
below.

Platform-specific macros and interfaces are defined in `vk_platform.h`.
These macros are used to control platform-dependent behavior, and their
exact definitions are under the control of specific platforms and Vulkan
implementations.

On many platforms the following macros are empty strings, causing platform-
and compiler-specific default calling conventions to be used.

`VKAPI_ATTR` is a macro placed before the return type in Vulkan API
function declarations.
This macro controls calling conventions for C++11 and GCC/Clang-style
compilers.

`VKAPI_CALL` is a macro placed after the return type in Vulkan API
function declarations.
This macro controls calling conventions for MSVC-style compilers.

`VKAPI_PTR` is a macro placed between the '(' and '*' in Vulkan API
function pointer declarations.
This macro also controls calling conventions, and typically has the same
definition as `VKAPI_ATTR` or `VKAPI_CALL`, depending on the
compiler.

With these macros, a Vulkan function declaration takes the form of:

VKAPI_ATTR  VKAPI_CALL ();

Additionally, a Vulkan function pointer type declaration takes the form of:

typedef  (VKAPI_PTR *PFN_)();

If the `VK_NO_STDINT_H` macro is defined by the application at compile
time, extended integer types used by the Vulkan API, such as `uint8_t`,
**must** also be defined by the application.
Otherwise, the Vulkan headers will not compile.
If `VK_NO_STDINT_H` is not defined, the system `` is used to
define these types.
There is a fallback path when Microsoft Visual Studio version 2008 and
earlier versions are detected at compile time.

If the `VK_NO_STDDEF_H` macro is defined by the application at compile
time, `size_t`, **must** also be defined by the application.
Otherwise, the Vulkan headers will not compile.
If `VK_NO_STDDEF_H` is not defined, the system `` is used to
define this type.

Applications that do not make use of window system-specific extensions may
simply include `vulkan_core.h` instead of `vulkan.h`, although there is
usually no reason to do so.
In addition to the Vulkan API, `vulkan_core.h` also defines and / or uses a
small number of C preprocessor macros that are described below.

If the `VK_NO_PROTOTYPES` macro is defined by an application at compile
time, prototypes for Vulkan APIs will not be included.
Only typedefs for API function pointers will be defined.

This is intended for applications using their own function loader and
dispatch mechanism.

If the macro is not defined by the application, prototypes for Vulkan APIs
will be included.

If the `VK_ONLY_EXPORTED_PROTOTYPES` macro is defined by an application
at compile time, only prototypes for Vulkan APIs tagged as `"exported"`in
the API XML will be included.
For non-tagged APIs, only typedefs for API function pointers will be
defined.

This is intended to match APIs which are statically exported by the Vulkan
loader.
At present, the exported APIs are only those defined by Vulkan core
versions.

If the macro is not defined by the application, prototypes for all Vulkan
APIs will be included.

`VK_HEADER_VERSION` is the version number of the `vulkan_core.h` header.
This value is kept synchronized with the patch version of the released
Specification.

// Provided by VK_VERSION_1_0
// Version of this file
#define VK_HEADER_VERSION 349

`VK_HEADER_VERSION_COMPLETE` is the complete version number of the
`vulkan_core.h` header, comprising the major, minor, and patch versions.
The major/minor values are kept synchronized with the complete version of
the released Specification.
This value is intended for use by automated tools to identify exactly which
version of the header was used during their generation.

Applications should not use this value as their
[VkApplicationInfo](../chapters/initialization.html#VkApplicationInfo)::`apiVersion`.
Instead applications should explicitly select a specific fixed major/minor
API version using, for example, one of the `VK_API_VERSION_`*_* values.

// Provided by VK_VERSION_1_0
// Complete version of this file
#define VK_HEADER_VERSION_COMPLETE VK_MAKE_API_VERSION(0, 1, 4, VK_HEADER_VERSION)

`VK_API_VERSION` is now commented out of `vulkan_core.h` and **cannot** be
used.

|  | This functionality is superseded by [Vulkan Version 1.0](versions.html#versions-1.0). See [Legacy Functionality](legacy.html#legacy-version-macros) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
//#define VK_API_VERSION VK_MAKE_API_VERSION(0, 1, 0, 0) // Patch version should always be set to 0

`VK_DEFINE_HANDLE` defines a [dispatchable handle](../chapters/fundamentals.html#fundamentals-objectmodel-overview) type.

// Provided by VK_VERSION_1_0
#define VK_DEFINE_HANDLE(object) typedef struct object##_T* object;

* 
`object` is the name of the resulting C type.

The only dispatchable handle types are those related to device and instance
management, such as [VkDevice](../chapters/devsandqueues.html#VkDevice).

`VK_DEFINE_NON_DISPATCHABLE_HANDLE` defines a
[non-dispatchable handle](../chapters/fundamentals.html#fundamentals-objectmodel-overview) type.

// Provided by VK_VERSION_1_0
#ifndef VK_DEFINE_NON_DISPATCHABLE_HANDLE
    #if (VK_USE_64_BIT_PTR_DEFINES==1)
        #define VK_DEFINE_NON_DISPATCHABLE_HANDLE(object) typedef struct object##_T *object;
    #else
        #define VK_DEFINE_NON_DISPATCHABLE_HANDLE(object) typedef uint64_t object;
    #endif
#endif

* 
`object` is the name of the resulting C type.

Most Vulkan handle types, such as [VkBuffer](../chapters/resources.html#VkBuffer), are non-dispatchable.

|  | The `vulkan_core.h` header allows the
| --- | --- |
[VK_DEFINE_NON_DISPATCHABLE_HANDLE](#VK_DEFINE_NON_DISPATCHABLE_HANDLE) and [VK_NULL_HANDLE](#VK_NULL_HANDLE) definitions
to be overridden by the application.
If [VK_DEFINE_NON_DISPATCHABLE_HANDLE](#VK_DEFINE_NON_DISPATCHABLE_HANDLE) is already defined when
`vulkan_core.h` is compiled, the default definitions for
[VK_DEFINE_NON_DISPATCHABLE_HANDLE](#VK_DEFINE_NON_DISPATCHABLE_HANDLE) and [VK_NULL_HANDLE](#VK_NULL_HANDLE) are
skipped.
This allows the application to define a binary-compatible custom handle
which **may** provide more type-safety or other features needed by the
application.
Applications **must** not define handles in a way that is not binary compatible
- where binary compatibility is platform dependent. |

`VK_NULL_HANDLE` is a reserved value representing a non-valid object
handle.
It may be passed to and returned from Vulkan commands only when
[specifically allowed](../chapters/fundamentals.html#fundamentals-validusage-handles).

// Provided by VK_VERSION_1_0
#ifndef VK_DEFINE_NON_DISPATCHABLE_HANDLE
    #if (VK_USE_64_BIT_PTR_DEFINES==1)
        #if (defined(__cplusplus) && (__cplusplus >= 201103L)) || (defined(_MSVC_LANG) && (_MSVC_LANG >= 201103L))
            #define VK_NULL_HANDLE nullptr
        #else
            #define VK_NULL_HANDLE ((void*)0)
        #endif
    #else
        #define VK_NULL_HANDLE 0ULL
    #endif
#endif
#ifndef VK_NULL_HANDLE
    #define VK_NULL_HANDLE 0
#endif

`VK_USE_64_BIT_PTR_DEFINES` defines whether the default non-dispatchable
handles are declared using either a 64-bit pointer type or a 64-bit unsigned
integer type.

`VK_USE_64_BIT_PTR_DEFINES` is set to '1' to use a 64-bit pointer type
or any other value to use a 64-bit unsigned integer type.

// Provided by VK_VERSION_1_0
#ifndef VK_USE_64_BIT_PTR_DEFINES
    #if defined(__LP64__) || defined(_WIN64) || (defined(__x86_64__) && !defined(__ILP32__) ) || defined(_M_X64) || defined(__ia64) || defined (_M_IA64) || defined(__aarch64__) || defined(__powerpc64__) || (defined(__riscv) && __riscv_xlen == 64)
        #define VK_USE_64_BIT_PTR_DEFINES 1
    #else
        #define VK_USE_64_BIT_PTR_DEFINES 0
    #endif
#endif

|  | The `vulkan_core.h` header allows the `VK_USE_64_BIT_PTR_DEFINES`
| --- | --- |
definition to be overridden by the application.
This allows the application to select either a 64-bit pointer type or a
64-bit unsigned integer type for non-dispatchable handles in the case where
the predefined preprocessor check does not identify the desired
configuration. |

|  | This macro was introduced starting with the Vulkan 1.2.174 headers, and its
| --- | --- |
availability can be checked at compile time by requiring
`VK_HEADER_VERSION` >= 174.

It is not available if you are using older headers, such as may be shipped
with an older Vulkan SDK.
Developers requiring this functionality may wish to include a copy of the
current Vulkan headers with their project in this case. |

To use a Vulkan extension supporting a platform-specific window system,
header files for that window system **must** be included at compile time, or
platform-specific types **must** be forward-declared.
The Vulkan header files are unable to determine whether or not an external
header is available at compile time, so platform-specific extensions are
provided in separate headers from the core API and platform-independent
extensions, allowing applications to decide which ones they need to be
defined and how the external headers are included.

Extensions dependent on particular sets of platform headers, or that
forward-declare platform-specific types, are declared in a header named for
that platform.
Before including these platform-specific Vulkan headers, applications **must**
include both `vulkan_core.h` and any external native headers the platform
extensions depend on.

As a convenience for applications that do not need the flexibility of
separate platform-specific Vulkan headers, `vulkan.h` includes
`vulkan_core.h`, and then conditionally includes platform-specific Vulkan
headers and the external headers they depend on.
Applications control which platform-specific headers are included by
#defining macros before including `vulkan.h`.

The correspondence between platform-specific extensions, external headers
they require, the platform-specific header which declares them, and the
preprocessor macros which enable inclusion by `vulkan.h` are shown in
the [following table](#boilerplate-wsi-header-table).

| Extension Name | Window System Name | Platform-specific Header | Required External Headers | Controlling `vulkan.h` Macro |
| --- | --- | --- | --- | --- |
| `[VK_KHR_android_surface](extensions.html#VK_KHR_android_surface)` | Android | `vulkan_android.h` | None | `VK_USE_PLATFORM_ANDROID_KHR` |
| `[VK_KHR_wayland_surface](extensions.html#VK_KHR_wayland_surface)` | Wayland | `vulkan_wayland.h` | `` | `VK_USE_PLATFORM_WAYLAND_KHR` |
| `[VK_KHR_win32_surface](extensions.html#VK_KHR_win32_surface)`,
  `[VK_KHR_external_memory_win32](extensions.html#VK_KHR_external_memory_win32)`,
  `[VK_KHR_win32_keyed_mutex](extensions.html#VK_KHR_win32_keyed_mutex)`,
  `[VK_KHR_external_semaphore_win32](extensions.html#VK_KHR_external_semaphore_win32)`,
  `[VK_KHR_external_fence_win32](extensions.html#VK_KHR_external_fence_win32)`,
  `[VK_NV_external_memory_win32](extensions.html#VK_NV_external_memory_win32)`,
  `[VK_NV_win32_keyed_mutex](extensions.html#VK_NV_win32_keyed_mutex)` | Microsoft Windows | `vulkan_win32.h` | `` | `VK_USE_PLATFORM_WIN32_KHR` |
| `[VK_KHR_xcb_surface](extensions.html#VK_KHR_xcb_surface)` | X11 Xcb | `vulkan_xcb.h` | `` | `VK_USE_PLATFORM_XCB_KHR` |
| `[VK_KHR_xlib_surface](extensions.html#VK_KHR_xlib_surface)` | X11 Xlib | `vulkan_xlib.h` | `` | `VK_USE_PLATFORM_XLIB_KHR` |
| `[VK_EXT_directfb_surface](extensions.html#VK_EXT_directfb_surface)` | DirectFB | `vulkan_directfb.h` | `` | `VK_USE_PLATFORM_DIRECTFB_EXT` |
| `[VK_EXT_acquire_xlib_display](extensions.html#VK_EXT_acquire_xlib_display)` | X11 XRAndR | `vulkan_xlib_xrandr.h` | ``,
                                                                                       `/Xrandr.h>` | `VK_USE_PLATFORM_XLIB_XRANDR_EXT` |
| `[VK_GGP_stream_descriptor_surface](extensions.html#VK_GGP_stream_descriptor_surface)`,
  `[VK_GGP_frame_token](extensions.html#VK_GGP_frame_token)` | Google Games Platform | `vulkan_ggp.h` |  | `VK_USE_PLATFORM_GGP` |
| `[VK_MVK_ios_surface](extensions.html#VK_MVK_ios_surface)` | iOS | `vulkan_ios.h` | None | `VK_USE_PLATFORM_IOS_MVK` |
| `[VK_MVK_macos_surface](extensions.html#VK_MVK_macos_surface)` | macOS | `vulkan_macos.h` | None | `VK_USE_PLATFORM_MACOS_MVK` |
| `[VK_OHOS_surface](extensions.html#VK_OHOS_surface)` | OHOS | `vulkan_ohos.h` | None | `VK_USE_PLATFORM_OHOS` |
| `[VK_NN_vi_surface](extensions.html#VK_NN_vi_surface)` | VI | `vulkan_vi.h` | None | `VK_USE_PLATFORM_VI_NN` |
| `[VK_FUCHSIA_imagepipe_surface](extensions.html#VK_FUCHSIA_imagepipe_surface)` | Fuchsia | `vulkan_fuchsia.h` | `` | `VK_USE_PLATFORM_FUCHSIA` |
| `[VK_EXT_metal_surface](extensions.html#VK_EXT_metal_surface)` | Metal on CoreAnimation | `vulkan_metal.h` | None | `VK_USE_PLATFORM_METAL_EXT` |
| `[VK_QNX_screen_surface](extensions.html#VK_QNX_screen_surface)` | QNX Screen | `vulkan_screen.h` | `` | `VK_USE_PLATFORM_SCREEN_QNX` |

|  | This section describes the purpose of the headers independently of the
| --- | --- |
specific underlying functionality of the window system extensions
themselves.
Each extension name will only link to a description of that extension when
viewing a specification built with that extension included. |

*Provisional* extensions **should** not be used in production applications.
The functionality defined by such extensions **may** change in ways that break
backwards compatibility between revisions, and before final release of a
non-provisional version of that extension.

Provisional extensions are defined in a separate *provisional header*,
`vulkan_beta.h`, allowing applications to decide whether or not to include
them.
The mechanism is similar to [window system-specific headers](#boilerplate-wsi-header): before including `vulkan_beta.h`, applications **must** include
`vulkan_core.h`.

|  | Sometimes a provisional extension will include a subset of its interfaces in
| --- | --- |
`vulkan_core.h`.
This may occur if the provisional extension is promoted from an existing
vendor or EXT extension and some of the existing interfaces are defined as
aliases of the provisional extension interfaces.
All other interfaces of that provisional extension which are not aliased
will be included in `vulkan_beta.h`. |

As a convenience for applications, `vulkan.h` conditionally includes
`vulkan_beta.h`.
Applications **can** control inclusion of `vulkan_beta.h` by #defining the
macro `VK_ENABLE_BETA_EXTENSIONS` before including `vulkan.h`.

|  | Starting in version 1.2.171 of the Specification, all provisional enumerants
| --- | --- |
are protected by the macro `VK_ENABLE_BETA_EXTENSIONS`.
Applications needing to use provisional extensions must always define this
macro, even if they are explicitly including `vulkan_beta.h`.
This is a minor change to behavior, affecting only provisional extensions. |

|  | This section describes the purpose of the provisional header independently
| --- | --- |
of the specific provisional extensions which are contained in that header at
any given time.
The extension appendices for provisional extensions note their provisional
status, and link back to this section for more information.
Provisional extensions are intended to provide early access for
bleeding-edge developers, with the understanding that extension interfaces
may change in response to developer feedback.
Provisional extensions are very likely to eventually be updated and released
as non-provisional extensions, but there is no guarantee this will happen,
or how long it will take if it does happen. |

Performing video coding operations usually involves the application having
to provide various parameters, data structures, or other syntax elements
specific to the particular video compression standard used, and the
associated semantics are covered by the specification of those.

The interface descriptions of these are available in the header files
derived from the `video.xml` XML file, which is the canonical
machine-readable description of data structures and enumerations that are
associated with the externally-provided video compression standards.

| Video Std Header Name | Description | Header File | Related Extensions |
| --- | --- | --- | --- |
| `vulkan_video_codecs_common` | Codec-independent common definitions | `` | - |
| `vulkan_video_codec_h264std` | ITU-T H.264 common definitions | `` | [VK_KHR_video_decode_h264](extensions.html#VK_KHR_video_decode_h264), [VK_KHR_video_encode_h264](extensions.html#VK_KHR_video_encode_h264) |
| `vulkan_video_codec_h264std_decode` | ITU-T H.264 decode-specific definitions | `` | [VK_KHR_video_decode_h264](extensions.html#VK_KHR_video_decode_h264) |
| `vulkan_video_codec_h264std_encode` | ITU-T H.264 encode-specific definitions | `` | [VK_KHR_video_encode_h264](extensions.html#VK_KHR_video_encode_h264) |
| `vulkan_video_codec_h265std` | ITU-T H.265 common definitions | `` | [VK_KHR_video_decode_h265](extensions.html#VK_KHR_video_decode_h265), [VK_KHR_video_encode_h265](extensions.html#VK_KHR_video_encode_h265) |
| `vulkan_video_codec_h265std_decode` | ITU-T H.265 decode-specific definitions | `` | [VK_KHR_video_decode_h265](extensions.html#VK_KHR_video_decode_h265) |
| `vulkan_video_codec_h265std_encode` | ITU-T H.265 encode-specific definitions | `` | [VK_KHR_video_encode_h265](extensions.html#VK_KHR_video_encode_h265) |
| `vulkan_video_codec_vp9std` | VP9 common definitions | `` | [VK_KHR_video_decode_vp9](extensions.html#VK_KHR_video_decode_vp9) |
| `vulkan_video_codec_vp9std_decode` | VP9 decode-specific definitions | `` | [VK_KHR_video_decode_vp9](extensions.html#VK_KHR_video_decode_vp9) |
| `vulkan_video_codec_av1std` | AV1 common definitions | `` | [VK_KHR_video_decode_av1](extensions.html#VK_KHR_video_decode_av1) |
| `vulkan_video_codec_av1std_decode` | AV1 decode-specific definitions | `` | [VK_KHR_video_decode_av1](extensions.html#VK_KHR_video_decode_av1) |
| `vulkan_video_codec_av1std_encode` | AV1 encode-specific definitions | `` | [VK_KHR_video_encode_av1](extensions.html#VK_KHR_video_encode_av1) |
