# WSIheaders(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WSIheaders.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WSIheaders - Control inclusion of window system interface extensions

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
the [following table](../../../../spec/latest/appendices/boilerplate.html#boilerplate-wsi-header-table).

| Extension Name | Window System Name | Platform-specific Header | Required External Headers | Controlling `vulkan.h` Macro |
| --- | --- | --- | --- | --- |
| `[VK_KHR_android_surface](VK_KHR_android_surface.html)` | Android | `vulkan_android.h` | None | `VK_USE_PLATFORM_ANDROID_KHR` |
| `[VK_KHR_wayland_surface](VK_KHR_wayland_surface.html)` | Wayland | `vulkan_wayland.h` | `` | `VK_USE_PLATFORM_WAYLAND_KHR` |
| `[VK_KHR_win32_surface](VK_KHR_win32_surface.html)`,
  `[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html)`,
  `[VK_KHR_win32_keyed_mutex](VK_KHR_win32_keyed_mutex.html)`,
  `[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html)`,
  `[VK_KHR_external_fence_win32](VK_KHR_external_fence_win32.html)`,
  `[VK_NV_external_memory_win32](VK_NV_external_memory_win32.html)`,
  `[VK_NV_win32_keyed_mutex](VK_NV_win32_keyed_mutex.html)` | Microsoft Windows | `vulkan_win32.h` | `` | `VK_USE_PLATFORM_WIN32_KHR` |
| `[VK_KHR_xcb_surface](VK_KHR_xcb_surface.html)` | X11 Xcb | `vulkan_xcb.h` | `` | `VK_USE_PLATFORM_XCB_KHR` |
| `[VK_KHR_xlib_surface](VK_KHR_xlib_surface.html)` | X11 Xlib | `vulkan_xlib.h` | `` | `VK_USE_PLATFORM_XLIB_KHR` |
| `[VK_EXT_directfb_surface](VK_EXT_directfb_surface.html)` | DirectFB | `vulkan_directfb.h` | `` | `VK_USE_PLATFORM_DIRECTFB_EXT` |
| `[VK_EXT_acquire_xlib_display](VK_EXT_acquire_xlib_display.html)` | X11 XRAndR | `vulkan_xlib_xrandr.h` | ``,
                                                                                       `/Xrandr.h>` | `VK_USE_PLATFORM_XLIB_XRANDR_EXT` |
| `[VK_GGP_stream_descriptor_surface](VK_GGP_stream_descriptor_surface.html)`,
  `[VK_GGP_frame_token](VK_GGP_frame_token.html)` | Google Games Platform | `vulkan_ggp.h` |  | `VK_USE_PLATFORM_GGP` |
| `[VK_MVK_ios_surface](VK_MVK_ios_surface.html)` | iOS | `vulkan_ios.h` | None | `VK_USE_PLATFORM_IOS_MVK` |
| `[VK_MVK_macos_surface](VK_MVK_macos_surface.html)` | macOS | `vulkan_macos.h` | None | `VK_USE_PLATFORM_MACOS_MVK` |
| `[VK_OHOS_surface](VK_OHOS_surface.html)` | OHOS | `vulkan_ohos.h` | None | `VK_USE_PLATFORM_OHOS` |
| `[VK_NN_vi_surface](VK_NN_vi_surface.html)` | VI | `vulkan_vi.h` | None | `VK_USE_PLATFORM_VI_NN` |
| `[VK_FUCHSIA_imagepipe_surface](VK_FUCHSIA_imagepipe_surface.html)` | Fuchsia | `vulkan_fuchsia.h` | `` | `VK_USE_PLATFORM_FUCHSIA` |
| `[VK_EXT_metal_surface](VK_EXT_metal_surface.html)` | Metal on CoreAnimation | `vulkan_metal.h` | None | `VK_USE_PLATFORM_METAL_EXT` |
| `[VK_QNX_screen_surface](VK_QNX_screen_surface.html)` | QNX Screen | `vulkan_screen.h` | `` | `VK_USE_PLATFORM_SCREEN_QNX` |

|  | This section describes the purpose of the headers independently of the
| --- | --- |
specific underlying functionality of the window system extensions
themselves.
Each extension name will only link to a description of that extension when
viewing a specification built with that extension included. |

[provisional-headers](provisional-headers.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#boilerplate-wsi-header).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
