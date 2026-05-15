# Window System Integration (WSI)

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_KHR_surface/wsi.html

## Table of Contents

- [WSI Platform](#_wsi_platform)
- [WSI Surface](#_wsi_surface)
- [Android Platform](#platformCreateSurface_android)
- [Wayland Platform](#platformCreateSurface_wayland)
- [Win32 Platform](#platformCreateSurface_win32)
- [XCB Platform](#platformCreateSurface_xcb)
- [Xlib Platform](#platformCreateSurface_xlib)
- [DirectFB Platform](#platformCreateSurface_directfb)
- [Fuchsia Platform](#platformCreateSurface_imagepipe)
- [Google Games Platform](#platformCreateSurface_streamdescriptor)
- [Google_Games_Platform](#platformCreateSurface_streamdescriptor)
- [iOS Platform](#platformCreateSurface_ios)
- [macOS Platform](#platformCreateSurface_macos)
- [VI Platform](#platformCreateSurface_vi)
- [Metal Platform](#platformCreateSurface_metal)
- [QNX Screen Platform](#platformCreateSurface_screen)
- [QNX_Screen_Platform](#platformCreateSurface_screen)
- [Open Harmony OS Platform Surface Creation](#platformCreateSurface_OHOS)
- [Open_Harmony_OS_Platform_Surface_Creation](#platformCreateSurface_OHOS)
- [UBM Platform](#_ubm_platform)
- [Platform-Independent Information](#_platform_independent_information)
- [Presenting Directly to Display Devices](#display)
- [Presenting_Directly_to_Display_Devices](#display)
- [Display Enumeration](#_display_enumeration)
- [Acquiring and Releasing Displays](#_acquiring_and_releasing_displays)
- [Acquiring_and_Releasing_Displays](#_acquiring_and_releasing_displays)
- [Display Planes](#_display_planes)
- [Display Modes](#_display_modes)
- [Display Control](#_display_control)
- [Display Surfaces](#wsi-display-surfaces)
- [Presenting to Headless Surfaces](#headless)
- [Presenting_to_Headless_Surfaces](#headless)
- [Querying for WSI Support](#_querying_for_wsi_support)
- [Querying_for_WSI_Support](#_querying_for_wsi_support)
- [Android Platform](#platformQuerySupport_android)
- [Wayland Platform](#platformQuerySupport_walyand)
- [Win32 Platform](#platformQuerySupport_win32)
- [XCB Platform](#platformQuerySupport_xcb)
- [Xlib Platform](#platformQuerySupport_xlib)
- [DirectFB Platform](#platformQuerySupport_directfb)
- [Metal Platform](#platformQuerySupport_metal)
- [Fuchsia Platform](#platformQuerySupport_fuchsia)
- [Google Games Platform](#platformQuerySupport_streamdescriptor)
- [Google_Games_Platform](#platformQuerySupport_streamdescriptor)
- [iOS Platform](#platformQuerySupport_ios)
- [macOS Platform](#platformQuerySupport_macos)
- [VI Platform](#platformQuerySupport_vi)
- [QNX Screen Platform](#platformQuerySupport_screen)
- [QNX_Screen_Platform](#platformQuerySupport_screen)
- [Open Harmony OS Platform](#platformQuerySupport_OHOS)
- [Open_Harmony_OS_Platform](#platformQuerySupport_OHOS)
- [UBM Platform](#platformQuerySupport_ubm)
- [Surface Queries](#_surface_queries)
- [Surface Capabilities](#_surface_capabilities)
- [Surface Format Support](#_surface_format_support)
- [Surface_Format_Support](#_surface_format_support)
- [Surface Presentation Mode Support](#_surface_presentation_mode_support)
- [Surface_Presentation_Mode_Support](#_surface_presentation_mode_support)
- [Full Screen Exclusive Control](#_full_screen_exclusive_control)
- [Full_Screen_Exclusive_Control](#_full_screen_exclusive_control)
- [Device Group Queries](#_device_group_queries)
- [Device_Group_Queries](#_device_group_queries)
- [Present Timing Queries](#_present_timing_queries)
- [Present_Timing_Queries](#_present_timing_queries)
- [Present Wait](#present-wait2)
- [WSI Swapchain](#wsi-swapchain)
- [HDR Metadata](#_hdr_metadata)
- [Lag Control](#lag-control)
- [Anti-Lag](#anti-lag)
- [Latency Reduction](#low-latency2)
- [Present Barrier](#present-barrier)
- [Present Metering](#present-metering)

## Content

This chapter discusses the window system integration (WSI) between the
Vulkan API and the various forms of displaying the results of rendering to a
user.
Since the Vulkan API **can** be used without displaying results, WSI is
provided through the use of optional Vulkan extensions.
This chapter provides an overview of WSI.
See the appendix for additional details of each WSI extension, including
which extensions **must** be enabled in order to use each of the functions
described in this chapter.

A platform is an abstraction for a window system, OS, etc.
Some examples include MS Windows, Android, and Wayland.
The Vulkan API **may** be integrated in a unique manner for each platform.

The Vulkan API does not define any type of platform object.
Platform-specific WSI extensions are defined, each containing
platform-specific functions for using WSI.
Use of these extensions is guarded by preprocessor symbols as defined in the
[Window System-Specific Header Control](../../appendices/boilerplate.html#boilerplate-wsi-header) appendix.

In order for an application to be compiled to use WSI with a given platform,
it **must** either:

* 
`#define` the appropriate preprocessor symbol prior to including the
`vulkan.h` header file, or

* 
include `vulkan_core.h` and any native platform headers, followed by the
appropriate platform-specific header.

The preprocessor symbols and platform-specific headers are defined in the
[Window System Extensions and Headers](../../appendices/boilerplate.html#boilerplate-wsi-header-table)
table.

Each platform-specific extension is an instance extension.
The application **must** enable instance extensions with `vkCreateInstance`
before using them.

Native platform surface or window objects are abstracted by surface objects,
which are represented by `VkSurfaceKHR` handles:

// Provided by VK_KHR_surface
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSurfaceKHR)

The `[VK_KHR_surface](../../appendices/extensions.html#VK_KHR_surface)` extension declares the `VkSurfaceKHR`
object, and provides a function for destroying `VkSurfaceKHR` objects.
Separate platform-specific extensions each provide a function for creating a
`VkSurfaceKHR` object for the respective platform.
From the application’s perspective this is an opaque handle, just like the
handles of other Vulkan objects.

To create a `VkSurfaceKHR` object for an Android native window, call:

// Provided by VK_KHR_android_surface
VkResult vkCreateAndroidSurfaceKHR(
    VkInstance                                  instance,
    const VkAndroidSurfaceCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkAndroidSurfaceCreateInfoKHR](#VkAndroidSurfaceCreateInfoKHR)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

During the lifetime of a surface created using a particular
`ANativeWindow` handle any attempts to create another surface for the
same `ANativeWindow` and any attempts to connect to the same
`ANativeWindow` through other platform mechanisms will fail.

|  | In particular, only one `VkSurfaceKHR` **can** exist at a time for a given
| --- | --- |
window.
Similarly, a native window **cannot** be used by both a `VkSurfaceKHR` and
`EGLSurface` simultaneously. |

If successful, `vkCreateAndroidSurfaceKHR` increments the
`ANativeWindow`’s reference count, and `vkDestroySurfaceKHR` will
decrement it.

On Android, when a swapchain’s `imageExtent` does not match the
surface’s `currentExtent`, the presentable images will be scaled to the
surface’s dimensions during presentation.
`minImageExtent` is (1,1), and `maxImageExtent` is the maximum
image size supported by the consumer.
For the system compositor, `currentExtent` is the window size (i.e. the
consumer’s preferred size).

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAndroidSurfaceKHR-instance-parameter) VUID-vkCreateAndroidSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateAndroidSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateAndroidSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAndroidSurfaceCreateInfoKHR](#VkAndroidSurfaceCreateInfoKHR) structure

* 
[](#VUID-vkCreateAndroidSurfaceKHR-pAllocator-parameter) VUID-vkCreateAndroidSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateAndroidSurfaceKHR-pSurface-parameter) VUID-vkCreateAndroidSurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkAndroidSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_android_surface
typedef struct VkAndroidSurfaceCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkAndroidSurfaceCreateFlagsKHR    flags;
    struct ANativeWindow*             window;
} VkAndroidSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`window` is a pointer to the `ANativeWindow` to associate the
surface with.

Valid Usage

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-window-01248) VUID-VkAndroidSurfaceCreateInfoKHR-window-01248

`window` **must** point to a valid Android `ANativeWindow`

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-sType-sType) VUID-VkAndroidSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_SURFACE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-pNext-pNext) VUID-VkAndroidSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAndroidSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkAndroidSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

To remove an unnecessary compile time dependency, an incomplete type
definition of `ANativeWindow` is provided in the Vulkan headers:

// Provided by VK_KHR_android_surface
struct ANativeWindow;

The actual `ANativeWindow` type is defined in Android NDK headers.

// Provided by VK_KHR_android_surface
typedef VkFlags VkAndroidSurfaceCreateFlagsKHR;

`VkAndroidSurfaceCreateFlagsKHR` is a bitmask type for setting a mask,
but is currently reserved for future use.

To create a `VkSurfaceKHR` object for a Wayland surface, call:

// Provided by VK_KHR_wayland_surface
VkResult vkCreateWaylandSurfaceKHR(
    VkInstance                                  instance,
    const VkWaylandSurfaceCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkWaylandSurfaceCreateInfoKHR](#VkWaylandSurfaceCreateInfoKHR)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateWaylandSurfaceKHR-instance-parameter) VUID-vkCreateWaylandSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateWaylandSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateWaylandSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkWaylandSurfaceCreateInfoKHR](#VkWaylandSurfaceCreateInfoKHR) structure

* 
[](#VUID-vkCreateWaylandSurfaceKHR-pAllocator-parameter) VUID-vkCreateWaylandSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateWaylandSurfaceKHR-pSurface-parameter) VUID-vkCreateWaylandSurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkWaylandSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_wayland_surface
typedef struct VkWaylandSurfaceCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkWaylandSurfaceCreateFlagsKHR    flags;
    struct wl_display*                display;
    struct wl_surface*                surface;
} VkWaylandSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`display` and `surface` are pointers to the Wayland
`wl_display` and `wl_surface` to associate the surface with.

Valid Usage

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-display-01304) VUID-VkWaylandSurfaceCreateInfoKHR-display-01304

`display` **must** point to a valid Wayland `wl_display`

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-surface-01305) VUID-VkWaylandSurfaceCreateInfoKHR-surface-01305

`surface` **must** point to a valid Wayland `wl_surface`

Valid Usage (Implicit)

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-sType-sType) VUID-VkWaylandSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WAYLAND_SURFACE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-pNext-pNext) VUID-VkWaylandSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkWaylandSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkWaylandSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

On Wayland, `currentExtent` is the special value (0xFFFFFFFF,
0xFFFFFFFF), indicating that the surface size will be determined by the
extent of a swapchain targeting the surface.
Whatever the application sets a swapchain’s `imageExtent` to will be the
size of the window, after the first image is presented.
`minImageExtent` is (1,1), and `maxImageExtent` is the maximum
supported surface size.
Any calls to [vkGetPhysicalDeviceSurfacePresentModesKHR](#vkGetPhysicalDeviceSurfacePresentModesKHR) on a surface
created with `vkCreateWaylandSurfaceKHR` are **required** to return
[VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR) as one of the valid present modes.

Some Vulkan functions **may** send protocol over the specified `wl_display`
connection when using a swapchain or presentable images created from a
`VkSurfaceKHR` referring to a `wl_surface`.
Applications **must** therefore ensure that both the `wl_display` and the
`wl_surface` remain valid for the lifetime of any `VkSwapchainKHR`
objects created from a particular `wl_display` and `wl_surface`.
Also, calling [vkQueuePresentKHR](#vkQueuePresentKHR) will result in Vulkan sending
`wl_surface.commit` requests to the underlying `wl_surface` of each
The `wl_surface.attach`, `wl_surface.damage`, and
`wl_surface.commit` requests **must** be issued by the implementation during
the call to [vkQueuePresentKHR](#vkQueuePresentKHR) and **must** not be issued by the
implementation outside of [vkQueuePresentKHR](#vkQueuePresentKHR).
This ensures that any Wayland requests sent by the client after the call to
[vkQueuePresentKHR](#vkQueuePresentKHR) returns will be received by the compositor after the
`wl_surface.commit`.
Regardless of the mode of swapchain creation, a new `wl_event_queue`
**must** be created for each successful [vkCreateWaylandSurfaceKHR](#vkCreateWaylandSurfaceKHR) call,
and every Wayland object created by the implementation **must** be assigned to
this event queue.
If the platform provides Wayland 1.11 or greater, this **must** be implemented
by the use of Wayland proxy object wrappers, to avoid race conditions.

If the application wishes to synchronize any window changes with a
particular frame, such requests **must** be sent to the Wayland display server
prior to calling [vkQueuePresentKHR](#vkQueuePresentKHR).

The implementation **must** ensure that no `wp_color_management_surface_v1`
object exists for a surface, which has no swapchains, or only swapchains
with a `imageColorSpace` of [VK_COLOR_SPACE_PASS_THROUGH_EXT](#VkColorSpaceKHR)
associated with it.

// Provided by VK_KHR_wayland_surface
typedef VkFlags VkWaylandSurfaceCreateFlagsKHR;

`VkWaylandSurfaceCreateFlagsKHR` is a bitmask type for setting a mask,
but is currently reserved for future use.

To create a `VkSurfaceKHR` object for a Win32 window, call:

// Provided by VK_KHR_win32_surface
VkResult vkCreateWin32SurfaceKHR(
    VkInstance                                  instance,
    const VkWin32SurfaceCreateInfoKHR*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkWin32SurfaceCreateInfoKHR](#VkWin32SurfaceCreateInfoKHR)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateWin32SurfaceKHR-instance-parameter) VUID-vkCreateWin32SurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateWin32SurfaceKHR-pCreateInfo-parameter) VUID-vkCreateWin32SurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkWin32SurfaceCreateInfoKHR](#VkWin32SurfaceCreateInfoKHR) structure

* 
[](#VUID-vkCreateWin32SurfaceKHR-pAllocator-parameter) VUID-vkCreateWin32SurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateWin32SurfaceKHR-pSurface-parameter) VUID-vkCreateWin32SurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

Some Vulkan functions **may** call the `SendMessage` system API when
interacting with a `VkSurfaceKHR` through a `VkSwapchainKHR`.
In a multithreaded environment, calling `SendMessage` from a thread that is
not the thread associated with `pCreateInfo->hwnd` will block until the
application has processed the window message.
Thus, applications **should** either call these Vulkan functions on the message
pump thread, or make sure their message pump is actively running.
Failing to do so **may** result in deadlocks.

The functions subject to this requirement are:

* 
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR)

* 
[vkDestroySwapchainKHR](#vkDestroySwapchainKHR)

* 
[vkAcquireNextImageKHR](#vkAcquireNextImageKHR) and [vkAcquireNextImage2KHR](#vkAcquireNextImage2KHR)

* 
[vkQueuePresentKHR](#vkQueuePresentKHR)

* 
[vkReleaseSwapchainImagesKHR](#vkReleaseSwapchainImagesKHR)

* 
[vkAcquireFullScreenExclusiveModeEXT](#vkAcquireFullScreenExclusiveModeEXT)

* 
[vkReleaseFullScreenExclusiveModeEXT](#vkReleaseFullScreenExclusiveModeEXT)

* 
[vkSetHdrMetadataEXT](#vkSetHdrMetadataEXT)

The `VkWin32SurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_win32_surface
typedef struct VkWin32SurfaceCreateInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    VkWin32SurfaceCreateFlagsKHR    flags;
    HINSTANCE                       hinstance;
    HWND                            hwnd;
} VkWin32SurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`hinstance` is the Win32 `HINSTANCE` for the window to associate
the surface with.

* 
`hwnd` is the Win32 `HWND` for the window to associate the
surface with.

Valid Usage

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-hinstance-01307) VUID-VkWin32SurfaceCreateInfoKHR-hinstance-01307

`hinstance` **must** be a valid Win32 `HINSTANCE`

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-hwnd-01308) VUID-VkWin32SurfaceCreateInfoKHR-hwnd-01308

`hwnd` **must** be a valid Win32 `HWND`

Valid Usage (Implicit)

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-sType-sType) VUID-VkWin32SurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WIN32_SURFACE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-pNext-pNext) VUID-VkWin32SurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkWin32SurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkWin32SurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

With Win32, `minImageExtent`, `maxImageExtent`, and
`currentExtent` **must** always equal the window size.

The `currentExtent` of a Win32 surface **must** have both `width` and
`height` greater than 0, or both of them 0.

|  | Due to above restrictions,
| --- | --- |
unless [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR) is used to specify
handling of disparities between surface and swapchain dimensions,
it is only possible to create a new swapchain on this platform with
`imageExtent` being equal to the current size of the window, as reported
in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`currentExtent`.

The window size **may** become (0, 0) on this platform (e.g. when the
window is minimized), and so a swapchain **cannot** be created until the size
changes. |

// Provided by VK_KHR_win32_surface
typedef VkFlags VkWin32SurfaceCreateFlagsKHR;

`VkWin32SurfaceCreateFlagsKHR` is a bitmask type for setting a mask, but
is currently reserved for future use.

To create a `VkSurfaceKHR` object for an X11 window, using the XCB
client-side library, call:

// Provided by VK_KHR_xcb_surface
VkResult vkCreateXcbSurfaceKHR(
    VkInstance                                  instance,
    const VkXcbSurfaceCreateInfoKHR*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkXcbSurfaceCreateInfoKHR](#VkXcbSurfaceCreateInfoKHR)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateXcbSurfaceKHR-instance-parameter) VUID-vkCreateXcbSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateXcbSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateXcbSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkXcbSurfaceCreateInfoKHR](#VkXcbSurfaceCreateInfoKHR) structure

* 
[](#VUID-vkCreateXcbSurfaceKHR-pAllocator-parameter) VUID-vkCreateXcbSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateXcbSurfaceKHR-pSurface-parameter) VUID-vkCreateXcbSurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkXcbSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_xcb_surface
typedef struct VkXcbSurfaceCreateInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    VkXcbSurfaceCreateFlagsKHR    flags;
    xcb_connection_t*             connection;
    xcb_window_t                  window;
} VkXcbSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`connection` is a pointer to an `xcb_connection_t` to the X
server.

* 
`window` is the `xcb_window_t` for the X11 window to associate
the surface with.

Valid Usage

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-connection-01310) VUID-VkXcbSurfaceCreateInfoKHR-connection-01310

`connection` **must** point to a valid X11 `xcb_connection_t`

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-window-01311) VUID-VkXcbSurfaceCreateInfoKHR-window-01311

`window` **must** be a valid X11 `xcb_window_t`

Valid Usage (Implicit)

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-sType-sType) VUID-VkXcbSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_XCB_SURFACE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-pNext-pNext) VUID-VkXcbSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkXcbSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkXcbSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

With Xcb, `minImageExtent`, `maxImageExtent`, and
`currentExtent` **must** always equal the window size.

The `currentExtent` of an Xcb surface **must** have both `width` and
`height` greater than 0, or both of them 0.

|  | Due to above restrictions,
| --- | --- |
unless [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR) is used to specify
handling of disparities between surface and swapchain dimensions,
it is only possible to create a new swapchain on this platform with
`imageExtent` being equal to the current size of the window, as reported
in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`currentExtent`.

The window size **may** become (0, 0) on this platform (e.g. when the
window is minimized), and so a swapchain **cannot** be created until the size
changes. |

Some Vulkan functions **may** send protocol over the specified xcb connection
when using a swapchain or presentable images created from a
[VkSurfaceKHR](#VkSurfaceKHR) referring to an xcb window.
Applications **must** therefore ensure the xcb connection is available to
Vulkan for the duration of any functions that manipulate such swapchains or
their presentable images, and any functions that build or queue command
buffers that operate on such presentable images.
Specifically, applications using Vulkan with xcb-based swapchains **must**

* 
Avoid holding a server grab on an xcb connection while waiting for
Vulkan operations to complete using a swapchain derived from a different
xcb connection referring to the same X server instance.
Failing to do so **may** result in deadlock.

// Provided by VK_KHR_xcb_surface
typedef VkFlags VkXcbSurfaceCreateFlagsKHR;

`VkXcbSurfaceCreateFlagsKHR` is a bitmask type for setting a mask, but
is currently reserved for future use.

To create a `VkSurfaceKHR` object for an X11 window, using the Xlib
client-side library, call:

// Provided by VK_KHR_xlib_surface
VkResult vkCreateXlibSurfaceKHR(
    VkInstance                                  instance,
    const VkXlibSurfaceCreateInfoKHR*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkXlibSurfaceCreateInfoKHR](#VkXlibSurfaceCreateInfoKHR)
structure containing the parameters affecting the creation of the
surface object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateXlibSurfaceKHR-instance-parameter) VUID-vkCreateXlibSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateXlibSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateXlibSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkXlibSurfaceCreateInfoKHR](#VkXlibSurfaceCreateInfoKHR) structure

* 
[](#VUID-vkCreateXlibSurfaceKHR-pAllocator-parameter) VUID-vkCreateXlibSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateXlibSurfaceKHR-pSurface-parameter) VUID-vkCreateXlibSurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkXlibSurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_xlib_surface
typedef struct VkXlibSurfaceCreateInfoKHR {
    VkStructureType                sType;
    const void*                    pNext;
    VkXlibSurfaceCreateFlagsKHR    flags;
    Display*                       dpy;
    Window                         window;
} VkXlibSurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`dpy` is a pointer to an Xlib `Display` connection to the X
server.

* 
`window` is an Xlib `Window` to associate the surface with.

Valid Usage

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-dpy-01313) VUID-VkXlibSurfaceCreateInfoKHR-dpy-01313

`dpy` **must** point to a valid Xlib `Display`

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-window-01314) VUID-VkXlibSurfaceCreateInfoKHR-window-01314

`window` **must** be a valid Xlib `Window`

Valid Usage (Implicit)

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-sType-sType) VUID-VkXlibSurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_XLIB_SURFACE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-pNext-pNext) VUID-VkXlibSurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkXlibSurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkXlibSurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

With Xlib, `minImageExtent`, `maxImageExtent`, and
`currentExtent` **must** always equal the window size.

The `currentExtent` of an Xlib surface **must** have both `width` and
`height` greater than 0, or both of them 0.

|  | Due to above restrictions,
| --- | --- |
unless [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR) is used to specify
handling of disparities between surface and swapchain dimensions,
it is only possible to create a new swapchain on this platform with
`imageExtent` being equal to the current size of the window, as reported
in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`currentExtent`.

The window size **may** become (0, 0) on this platform (e.g. when the
window is minimized), and so a swapchain **cannot** be created until the size
changes. |

Some Vulkan functions **may** send protocol over the specified Xlib
`Display` connection when using a swapchain or presentable images created
from a [VkSurfaceKHR](#VkSurfaceKHR) referring to an Xlib window.
Applications **must** therefore ensure the display connection is available to
Vulkan for the duration of any functions that manipulate such swapchains or
their presentable images, and any functions that build or queue command
buffers that operate on such presentable images.
Specifically, applications using Vulkan with Xlib-based swapchains **must**

* 
Avoid holding a server grab on a display connection while waiting for
Vulkan operations to complete using a swapchain derived from a different
display connection referring to the same X server instance.
Failing to do so **may** result in deadlock.

Some implementations may require threads to implement some presentation
modes so applications **must** call `XInitThreads`() before calling any
other Xlib functions.

// Provided by VK_KHR_xlib_surface
typedef VkFlags VkXlibSurfaceCreateFlagsKHR;

`VkXlibSurfaceCreateFlagsKHR` is a bitmask type for setting a mask, but
is currently reserved for future use.

To create a `VkSurfaceKHR` object for a DirectFB surface, call:

// Provided by VK_EXT_directfb_surface
VkResult vkCreateDirectFBSurfaceEXT(
    VkInstance                                  instance,
    const VkDirectFBSurfaceCreateInfoEXT*       pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkDirectFBSurfaceCreateInfoEXT](#VkDirectFBSurfaceCreateInfoEXT)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-instance-parameter) VUID-vkCreateDirectFBSurfaceEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-pCreateInfo-parameter) VUID-vkCreateDirectFBSurfaceEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDirectFBSurfaceCreateInfoEXT](#VkDirectFBSurfaceCreateInfoEXT) structure

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-pAllocator-parameter) VUID-vkCreateDirectFBSurfaceEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDirectFBSurfaceEXT-pSurface-parameter) VUID-vkCreateDirectFBSurfaceEXT-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDirectFBSurfaceCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_directfb_surface
typedef struct VkDirectFBSurfaceCreateInfoEXT {
    VkStructureType                    sType;
    const void*                        pNext;
    VkDirectFBSurfaceCreateFlagsEXT    flags;
    IDirectFB*                         dfb;
    IDirectFBSurface*                  surface;
} VkDirectFBSurfaceCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`dfb` is a pointer to the `IDirectFB` main interface of DirectFB.

* 
`surface` is a pointer to a `IDirectFBSurface` surface interface.

Valid Usage

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-dfb-04117) VUID-VkDirectFBSurfaceCreateInfoEXT-dfb-04117

`dfb` **must** point to a valid DirectFB `IDirectFB`

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-surface-04118) VUID-VkDirectFBSurfaceCreateInfoEXT-surface-04118

`surface` **must** point to a valid DirectFB `IDirectFBSurface`

Valid Usage (Implicit)

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-sType-sType) VUID-VkDirectFBSurfaceCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DIRECTFB_SURFACE_CREATE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-pNext-pNext) VUID-VkDirectFBSurfaceCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDirectFBSurfaceCreateInfoEXT-flags-zerobitmask) VUID-VkDirectFBSurfaceCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

With DirectFB, `minImageExtent`, `maxImageExtent`, and
`currentExtent` **must** always equal the surface size.

// Provided by VK_EXT_directfb_surface
typedef VkFlags VkDirectFBSurfaceCreateFlagsEXT;

`VkDirectFBSurfaceCreateFlagsEXT` is a bitmask type for setting a mask,
but is currently reserved for future use.

To create a `VkSurfaceKHR` object for a Fuchsia ImagePipe, call:

// Provided by VK_FUCHSIA_imagepipe_surface
VkResult vkCreateImagePipeSurfaceFUCHSIA(
    VkInstance                                  instance,
    const VkImagePipeSurfaceCreateInfoFUCHSIA*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate with the surface.

* 
`pCreateInfo` is a pointer to a
[VkImagePipeSurfaceCreateInfoFUCHSIA](#VkImagePipeSurfaceCreateInfoFUCHSIA) structure containing
parameters affecting the creation of the surface object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-instance-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-pCreateInfo-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImagePipeSurfaceCreateInfoFUCHSIA](#VkImagePipeSurfaceCreateInfoFUCHSIA) structure

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-pAllocator-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateImagePipeSurfaceFUCHSIA-pSurface-parameter) VUID-vkCreateImagePipeSurfaceFUCHSIA-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkImagePipeSurfaceCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_imagepipe_surface
typedef struct VkImagePipeSurfaceCreateInfoFUCHSIA {
    VkStructureType                         sType;
    const void*                             pNext;
    VkImagePipeSurfaceCreateFlagsFUCHSIA    flags;
    zx_handle_t                             imagePipeHandle;
} VkImagePipeSurfaceCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`imagePipeHandle` is a `zx_handle_t` referring to the ImagePipe
to associate with the surface.

Valid Usage

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-imagePipeHandle-04863) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-imagePipeHandle-04863

`imagePipeHandle` **must** be a valid `zx_handle_t`

Valid Usage (Implicit)

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-sType-sType) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGEPIPE_SURFACE_CREATE_INFO_FUCHSIA](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-pNext-pNext) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-flags-zerobitmask) VUID-VkImagePipeSurfaceCreateInfoFUCHSIA-flags-zerobitmask

 `flags` **must** be `0`

On Fuchsia, the surface `currentExtent` is the special value
(0xFFFFFFFF, 0xFFFFFFFF), indicating that the surface size will be
determined by the extent of a swapchain targeting the surface.

// Provided by VK_FUCHSIA_imagepipe_surface
typedef VkFlags VkImagePipeSurfaceCreateFlagsFUCHSIA;

`VkImagePipeSurfaceCreateFlagsFUCHSIA` is a bitmask type for setting a
mask, but is currently reserved for future use.

To create a `VkSurfaceKHR` object for a Google Games Platform stream
descriptor, call:

// Provided by VK_GGP_stream_descriptor_surface
VkResult vkCreateStreamDescriptorSurfaceGGP(
    VkInstance                                  instance,
    const VkStreamDescriptorSurfaceCreateInfoGGP* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate with the surface.

* 
`pCreateInfo` is a pointer to a
`VkStreamDescriptorSurfaceCreateInfoGGP` structure containing
parameters that affect the creation of the surface object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateStreamDescriptorSurfaceGGP-instance-parameter) VUID-vkCreateStreamDescriptorSurfaceGGP-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateStreamDescriptorSurfaceGGP-pCreateInfo-parameter) VUID-vkCreateStreamDescriptorSurfaceGGP-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkStreamDescriptorSurfaceCreateInfoGGP](#VkStreamDescriptorSurfaceCreateInfoGGP) structure

* 
[](#VUID-vkCreateStreamDescriptorSurfaceGGP-pAllocator-parameter) VUID-vkCreateStreamDescriptorSurfaceGGP-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateStreamDescriptorSurfaceGGP-pSurface-parameter) VUID-vkCreateStreamDescriptorSurfaceGGP-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkStreamDescriptorSurfaceCreateInfoGGP` structure is defined as:

// Provided by VK_GGP_stream_descriptor_surface
typedef struct VkStreamDescriptorSurfaceCreateInfoGGP {
    VkStructureType                            sType;
    const void*                                pNext;
    VkStreamDescriptorSurfaceCreateFlagsGGP    flags;
    GgpStreamDescriptor                        streamDescriptor;
} VkStreamDescriptorSurfaceCreateInfoGGP;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`streamDescriptor` is a `GgpStreamDescriptor` referring to the
GGP stream descriptor to associate with the surface.

Valid Usage

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-streamDescriptor-02681) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-streamDescriptor-02681

`streamDescriptor` **must** be a valid `GgpStreamDescriptor`

Valid Usage (Implicit)

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-sType-sType) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_STREAM_DESCRIPTOR_SURFACE_CREATE_INFO_GGP](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-pNext-pNext) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkStreamDescriptorSurfaceCreateInfoGGP-flags-zerobitmask) VUID-VkStreamDescriptorSurfaceCreateInfoGGP-flags-zerobitmask

 `flags` **must** be `0`

On Google Games Platform, the surface extents are dynamic.
The `minImageExtent` will never be greater than 1080p and the
`maxImageExtent` will never be less than 1080p.
The `currentExtent` will reflect the current optimal resolution.

Applications are expected to choose an appropriate size for the swapchain’s
`imageExtent`, within the bounds of the surface.
Using the surface’s `currentExtent` will offer the best performance and
quality.
When a swapchain’s `imageExtent` does not match the surface’s
`currentExtent`, the presentable images are scaled to the surface’s
dimensions during presentation if possible and [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) is
returned, otherwise presentation fails with [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult).

// Provided by VK_GGP_stream_descriptor_surface
typedef VkFlags VkStreamDescriptorSurfaceCreateFlagsGGP;

`VkStreamDescriptorSurfaceCreateFlagsGGP` is a bitmask type for setting
a mask, but is currently reserved for future use.

To create a `VkSurfaceKHR` object for an iOS `UIView` or
`CAMetalLayer`, call:

// Provided by VK_MVK_ios_surface
VkResult vkCreateIOSSurfaceMVK(
    VkInstance                                  instance,
    const VkIOSSurfaceCreateInfoMVK*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance with which to associate the surface.

* 
`pCreateInfo` is a pointer to a [VkIOSSurfaceCreateInfoMVK](#VkIOSSurfaceCreateInfoMVK)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

|  | The `vkCreateIOSSurfaceMVK` function is considered legacy and has been
| --- | --- |
superseded by [vkCreateMetalSurfaceEXT](#vkCreateMetalSurfaceEXT) from the
`[VK_EXT_metal_surface](../../appendices/extensions.html#VK_EXT_metal_surface)` extension. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateIOSSurfaceMVK-instance-parameter) VUID-vkCreateIOSSurfaceMVK-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateIOSSurfaceMVK-pCreateInfo-parameter) VUID-vkCreateIOSSurfaceMVK-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkIOSSurfaceCreateInfoMVK](#VkIOSSurfaceCreateInfoMVK) structure

* 
[](#VUID-vkCreateIOSSurfaceMVK-pAllocator-parameter) VUID-vkCreateIOSSurfaceMVK-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateIOSSurfaceMVK-pSurface-parameter) VUID-vkCreateIOSSurfaceMVK-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The [VkIOSSurfaceCreateInfoMVK](#VkIOSSurfaceCreateInfoMVK) structure is defined as:

// Provided by VK_MVK_ios_surface
typedef struct VkIOSSurfaceCreateInfoMVK {
    VkStructureType               sType;
    const void*                   pNext;
    VkIOSSurfaceCreateFlagsMVK    flags;
    const void*                   pView;
} VkIOSSurfaceCreateInfoMVK;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pView` is a reference to either a `CAMetalLayer` object or a
`UIView` object.

Valid Usage

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-pView-04143) VUID-VkIOSSurfaceCreateInfoMVK-pView-04143

If `pView` is a `CAMetalLayer` object, it **must** be a valid
`CAMetalLayer`

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-pView-01316) VUID-VkIOSSurfaceCreateInfoMVK-pView-01316

If `pView` is a `UIView` object, it **must** be a valid `UIView`,
**must** be backed by a `CALayer` object of type `CAMetalLayer`,
and [vkCreateIOSSurfaceMVK](#vkCreateIOSSurfaceMVK) **must** be called on the main thread

Valid Usage (Implicit)

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-sType-sType) VUID-VkIOSSurfaceCreateInfoMVK-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IOS_SURFACE_CREATE_INFO_MVK](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-pNext-pNext) VUID-VkIOSSurfaceCreateInfoMVK-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkIOSSurfaceCreateInfoMVK-flags-zerobitmask) VUID-VkIOSSurfaceCreateInfoMVK-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_MVK_ios_surface
typedef VkFlags VkIOSSurfaceCreateFlagsMVK;

`VkIOSSurfaceCreateFlagsMVK` is a bitmask type for setting a mask, but
is currently reserved for future use.

To create a `VkSurfaceKHR` object for a macOS `NSView` or
`CAMetalLayer`, call:

// Provided by VK_MVK_macos_surface
VkResult vkCreateMacOSSurfaceMVK(
    VkInstance                                  instance,
    const VkMacOSSurfaceCreateInfoMVK*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance with which to associate the surface.

* 
`pCreateInfo` is a pointer to a [VkMacOSSurfaceCreateInfoMVK](#VkMacOSSurfaceCreateInfoMVK)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

|  | The `vkCreateMacOSSurfaceMVK` function is considered legacy and has been
| --- | --- |
superseded by [vkCreateMetalSurfaceEXT](#vkCreateMetalSurfaceEXT) from the
`[VK_EXT_metal_surface](../../appendices/extensions.html#VK_EXT_metal_surface)` extension. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateMacOSSurfaceMVK-instance-parameter) VUID-vkCreateMacOSSurfaceMVK-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateMacOSSurfaceMVK-pCreateInfo-parameter) VUID-vkCreateMacOSSurfaceMVK-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkMacOSSurfaceCreateInfoMVK](#VkMacOSSurfaceCreateInfoMVK) structure

* 
[](#VUID-vkCreateMacOSSurfaceMVK-pAllocator-parameter) VUID-vkCreateMacOSSurfaceMVK-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateMacOSSurfaceMVK-pSurface-parameter) VUID-vkCreateMacOSSurfaceMVK-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The [VkMacOSSurfaceCreateInfoMVK](#VkMacOSSurfaceCreateInfoMVK) structure is defined as:

// Provided by VK_MVK_macos_surface
typedef struct VkMacOSSurfaceCreateInfoMVK {
    VkStructureType                 sType;
    const void*                     pNext;
    VkMacOSSurfaceCreateFlagsMVK    flags;
    const void*                     pView;
} VkMacOSSurfaceCreateInfoMVK;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pView` is a reference to either a `CAMetalLayer` object or
an `NSView` object.

Valid Usage

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-pView-04144) VUID-VkMacOSSurfaceCreateInfoMVK-pView-04144

If `pView` is a `CAMetalLayer` object, it **must** be a valid
`CAMetalLayer`

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-pView-01317) VUID-VkMacOSSurfaceCreateInfoMVK-pView-01317

If `pView` is an `NSView` object, it **must** be a valid
`NSView`, **must** be backed by a `CALayer` object of type
`CAMetalLayer`, and [vkCreateMacOSSurfaceMVK](#vkCreateMacOSSurfaceMVK) **must** be called
on the main thread

Valid Usage (Implicit)

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-sType-sType) VUID-VkMacOSSurfaceCreateInfoMVK-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MACOS_SURFACE_CREATE_INFO_MVK](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-pNext-pNext) VUID-VkMacOSSurfaceCreateInfoMVK-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMacOSSurfaceCreateInfoMVK-flags-zerobitmask) VUID-VkMacOSSurfaceCreateInfoMVK-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_MVK_macos_surface
typedef VkFlags VkMacOSSurfaceCreateFlagsMVK;

`VkMacOSSurfaceCreateFlagsMVK` is a bitmask type for setting a mask, but
is currently reserved for future use.

To create a `VkSurfaceKHR` object for an `nn`::`vi`::`Layer`,
query the layer’s native handle using
`nn`::`vi`::`GetNativeWindow`, and then call:

// Provided by VK_NN_vi_surface
VkResult vkCreateViSurfaceNN(
    VkInstance                                  instance,
    const VkViSurfaceCreateInfoNN*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance with which to associate the surface.

* 
`pCreateInfo` is a pointer to a [VkViSurfaceCreateInfoNN](#VkViSurfaceCreateInfoNN)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

During the lifetime of a surface created using a particular
`nn`::`vi`::`NativeWindowHandle`, applications **must** not attempt to
create another surface for the same `nn`::`vi`::`Layer` or attempt
to connect to the same `nn`::`vi`::`Layer` through other platform
mechanisms.

If the native window is created with a specified size, `currentExtent`
will reflect that size.
In this case, applications should use the same size for the swapchain’s
`imageExtent`.
Otherwise, the `currentExtent` will have the special value
(0xFFFFFFFF, 0xFFFFFFFF), indicating that applications are expected to
choose an appropriate size for the swapchain’s `imageExtent` (e.g., by
matching the result of a call to
`nn`::`vi`::`GetDisplayResolution`).

Valid Usage (Implicit)

* 
[](#VUID-vkCreateViSurfaceNN-instance-parameter) VUID-vkCreateViSurfaceNN-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateViSurfaceNN-pCreateInfo-parameter) VUID-vkCreateViSurfaceNN-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkViSurfaceCreateInfoNN](#VkViSurfaceCreateInfoNN) structure

* 
[](#VUID-vkCreateViSurfaceNN-pAllocator-parameter) VUID-vkCreateViSurfaceNN-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateViSurfaceNN-pSurface-parameter) VUID-vkCreateViSurfaceNN-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkViSurfaceCreateInfoNN` structure is defined as:

// Provided by VK_NN_vi_surface
typedef struct VkViSurfaceCreateInfoNN {
    VkStructureType             sType;
    const void*                 pNext;
    VkViSurfaceCreateFlagsNN    flags;
    void*                       window;
} VkViSurfaceCreateInfoNN;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`window` is the `nn`::`vi`::`NativeWindowHandle` for the
`nn`::`vi`::`Layer` with which to associate the surface.

Valid Usage

* 
[](#VUID-VkViSurfaceCreateInfoNN-window-01318) VUID-VkViSurfaceCreateInfoNN-window-01318

`window` **must** be a valid `nn`::`vi`::`NativeWindowHandle`

Valid Usage (Implicit)

* 
[](#VUID-VkViSurfaceCreateInfoNN-sType-sType) VUID-VkViSurfaceCreateInfoNN-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VI_SURFACE_CREATE_INFO_NN](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkViSurfaceCreateInfoNN-pNext-pNext) VUID-VkViSurfaceCreateInfoNN-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkViSurfaceCreateInfoNN-flags-zerobitmask) VUID-VkViSurfaceCreateInfoNN-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_NN_vi_surface
typedef VkFlags VkViSurfaceCreateFlagsNN;

`VkViSurfaceCreateFlagsNN` is a bitmask type for setting a mask, but is
currently reserved for future use.

To create a `VkSurfaceKHR` object for a `CAMetalLayer`, call:

// Provided by VK_EXT_metal_surface
VkResult vkCreateMetalSurfaceEXT(
    VkInstance                                  instance,
    const VkMetalSurfaceCreateInfoEXT*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance with which to associate the surface.

* 
`pCreateInfo` is a pointer to a [VkMetalSurfaceCreateInfoEXT](#VkMetalSurfaceCreateInfoEXT)
structure specifying parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateMetalSurfaceEXT-instance-parameter) VUID-vkCreateMetalSurfaceEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateMetalSurfaceEXT-pCreateInfo-parameter) VUID-vkCreateMetalSurfaceEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkMetalSurfaceCreateInfoEXT](#VkMetalSurfaceCreateInfoEXT) structure

* 
[](#VUID-vkCreateMetalSurfaceEXT-pAllocator-parameter) VUID-vkCreateMetalSurfaceEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateMetalSurfaceEXT-pSurface-parameter) VUID-vkCreateMetalSurfaceEXT-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The [VkMetalSurfaceCreateInfoEXT](#VkMetalSurfaceCreateInfoEXT) structure is defined as:

// Provided by VK_EXT_metal_surface
typedef struct VkMetalSurfaceCreateInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkMetalSurfaceCreateFlagsEXT    flags;
    const CAMetalLayer*             pLayer;
} VkMetalSurfaceCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pLayer` is a reference to a `CAMetalLayer` object
representing a renderable surface.

Valid Usage (Implicit)

* 
[](#VUID-VkMetalSurfaceCreateInfoEXT-sType-sType) VUID-VkMetalSurfaceCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_METAL_SURFACE_CREATE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkMetalSurfaceCreateInfoEXT-pNext-pNext) VUID-VkMetalSurfaceCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMetalSurfaceCreateInfoEXT-flags-zerobitmask) VUID-VkMetalSurfaceCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

To remove an unnecessary compile time dependency, an incomplete type
definition of `CAMetalLayer` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_surface
#ifdef __OBJC__
@class CAMetalLayer;
#else
typedef void CAMetalLayer;
#endif

The actual `CAMetalLayer` type is defined in the QuartzCore
framework.

// Provided by VK_EXT_metal_surface
typedef VkFlags VkMetalSurfaceCreateFlagsEXT;

`VkMetalSurfaceCreateFlagsEXT` is a bitmask type for setting a mask, but
is currently reserved for future use.

To create a `VkSurfaceKHR` object for a QNX Screen surface, call:

// Provided by VK_QNX_screen_surface
VkResult vkCreateScreenSurfaceQNX(
    VkInstance                                  instance,
    const VkScreenSurfaceCreateInfoQNX*         pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkScreenSurfaceCreateInfoQNX](#VkScreenSurfaceCreateInfoQNX)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateScreenSurfaceQNX-instance-parameter) VUID-vkCreateScreenSurfaceQNX-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateScreenSurfaceQNX-pCreateInfo-parameter) VUID-vkCreateScreenSurfaceQNX-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkScreenSurfaceCreateInfoQNX](#VkScreenSurfaceCreateInfoQNX) structure

* 
[](#VUID-vkCreateScreenSurfaceQNX-pAllocator-parameter) VUID-vkCreateScreenSurfaceQNX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateScreenSurfaceQNX-pSurface-parameter) VUID-vkCreateScreenSurfaceQNX-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkScreenSurfaceCreateInfoQNX` structure is defined as:

// Provided by VK_QNX_screen_surface
typedef struct VkScreenSurfaceCreateInfoQNX {
    VkStructureType                  sType;
    const void*                      pNext;
    VkScreenSurfaceCreateFlagsQNX    flags;
    struct _screen_context*          context;
    struct _screen_window*           window;
} VkScreenSurfaceCreateInfoQNX;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`context` and `window` are QNX Screen `context` and
`window` to associate the surface with.

Valid Usage

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-context-04741) VUID-VkScreenSurfaceCreateInfoQNX-context-04741

`context` **must** point to a valid QNX Screen `struct`
_screen_context

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-window-04742) VUID-VkScreenSurfaceCreateInfoQNX-window-04742

`window` **must** point to a valid QNX Screen `struct`
_screen_window

Valid Usage (Implicit)

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-sType-sType) VUID-VkScreenSurfaceCreateInfoQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SCREEN_SURFACE_CREATE_INFO_QNX](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-pNext-pNext) VUID-VkScreenSurfaceCreateInfoQNX-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkScreenSurfaceCreateInfoQNX-flags-zerobitmask) VUID-VkScreenSurfaceCreateInfoQNX-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_QNX_screen_surface
typedef VkFlags VkScreenSurfaceCreateFlagsQNX;

`VkScreenSurfaceCreateFlagsQNX` is a bitmask type for setting a mask,
but is currently reserved for future use.

To create a `VkSurfaceKHR` object on Open Harmony OS platform, call:

// Provided by VK_OHOS_surface
VkResult vkCreateSurfaceOHOS(
    VkInstance                                  instance,
    const VkSurfaceCreateInfoOHOS*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkSurfaceCreateInfoOHOS](#VkSurfaceCreateInfoOHOS)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSurfaceOHOS-instance-parameter) VUID-vkCreateSurfaceOHOS-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateSurfaceOHOS-pCreateInfo-parameter) VUID-vkCreateSurfaceOHOS-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSurfaceCreateInfoOHOS](#VkSurfaceCreateInfoOHOS) structure

* 
[](#VUID-vkCreateSurfaceOHOS-pAllocator-parameter) VUID-vkCreateSurfaceOHOS-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateSurfaceOHOS-pSurface-parameter) VUID-vkCreateSurfaceOHOS-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSurfaceCreateInfoOHOS` structure is defined as:

// Provided by VK_OHOS_surface
typedef struct VkSurfaceCreateInfoOHOS {
    VkStructureType             sType;
    const void*                 pNext;
    VkSurfaceCreateFlagsOHOS    flags;
    OHNativeWindow*             window;
} VkSurfaceCreateInfoOHOS;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`window`: is a pointer to a `OHNativeWindow` to associate the
surface with.

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCreateInfoOHOS-sType-sType) VUID-VkSurfaceCreateInfoOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CREATE_INFO_OHOS](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfaceCreateInfoOHOS-pNext-pNext) VUID-VkSurfaceCreateInfoOHOS-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSurfaceCreateInfoOHOS-flags-zerobitmask) VUID-VkSurfaceCreateInfoOHOS-flags-zerobitmask

 `flags` **must** be `0`

The `OHNativeWindow` structure is defined as:

// Provided by VK_OHOS_surface
typedef struct NativeWindow OHNativeWindow;

It is the native window structure on Open Harmony OS platform.
It is exposed by the Open Harmony OS NDK.

// Provided by VK_OHOS_surface
typedef VkFlags VkSurfaceCreateFlagsOHOS;

`VkSurfaceCreateFlagsOHOS` is a bitmask type for setting a mask, but is
currently reserved for future use.

To create a `VkSurfaceKHR` object for a UBM surface, call:

// Provided by VK_SEC_ubm_surface
VkResult vkCreateUbmSurfaceSEC(
    VkInstance                                  instance,
    const VkUbmSurfaceCreateInfoSEC*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkUbmSurfaceCreateInfoSEC](#VkUbmSurfaceCreateInfoSEC)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateUbmSurfaceSEC-instance-parameter) VUID-vkCreateUbmSurfaceSEC-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateUbmSurfaceSEC-pCreateInfo-parameter) VUID-vkCreateUbmSurfaceSEC-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkUbmSurfaceCreateInfoSEC](#VkUbmSurfaceCreateInfoSEC) structure

* 
[](#VUID-vkCreateUbmSurfaceSEC-pAllocator-parameter) VUID-vkCreateUbmSurfaceSEC-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateUbmSurfaceSEC-pSurface-parameter) VUID-vkCreateUbmSurfaceSEC-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkUbmSurfaceCreateInfoSEC` structure is defined as:

// Provided by VK_SEC_ubm_surface
typedef struct VkUbmSurfaceCreateInfoSEC {
    VkStructureType               sType;
    const void*                   pNext;
    VkUbmSurfaceCreateFlagsSEC    flags;
    struct ubm_device*            device;
    struct ubm_surface*           surface;
} VkUbmSurfaceCreateInfoSEC;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`device` is a pointer to a `ubm_device` to associate the surface
with.

* 
`surface` is a pointer to a `ubm_surface` to associate the
surface with.

Valid Usage

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-device-12366) VUID-VkUbmSurfaceCreateInfoSEC-device-12366

`device` **must** point to a valid UBM `ubm_device`

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-surface-12367) VUID-VkUbmSurfaceCreateInfoSEC-surface-12367

`surface` **must** point to a valid UBM `ubm_surface`

Valid Usage (Implicit)

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-sType-sType) VUID-VkUbmSurfaceCreateInfoSEC-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_UBM_SURFACE_CREATE_INFO_SEC](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-pNext-pNext) VUID-VkUbmSurfaceCreateInfoSEC-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkUbmSurfaceCreateInfoSEC-flags-zerobitmask) VUID-VkUbmSurfaceCreateInfoSEC-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_SEC_ubm_surface
typedef VkFlags VkUbmSurfaceCreateFlagsSEC;

`VkUbmSurfaceCreateFlagsSEC` is a bitmask type for setting a mask, but
is currently reserved for future use.

Once created, `VkSurfaceKHR` objects **can** be used in this and other
extensions, in particular the `[VK_KHR_swapchain](../../appendices/extensions.html#VK_KHR_swapchain)` extension.

Several WSI functions return [VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult) if the surface
becomes no longer available.
After such an error, the surface (and any child swapchain, if one exists)
**should** be destroyed, as there is no way to restore them to a not-lost
state.
Applications **may** attempt to create a new `VkSurfaceKHR` using the same
native platform window object, but whether such re-creation will succeed is
platform-dependent and **may** depend on the reason the surface became
unavailable.
A lost surface does not otherwise cause devices to be
[lost](../devsandqueues.html#devsandqueues-lost-device).

To destroy a `VkSurfaceKHR` object, call:

// Provided by VK_KHR_surface
void vkDestroySurfaceKHR(
    VkInstance                                  instance,
    VkSurfaceKHR                                surface,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the instance used to create the surface.

* 
`surface` is the surface to destroy.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

Destroying a `VkSurfaceKHR` merely severs the connection between Vulkan
and the native surface, and does not imply destroying the native surface,
closing a window, or similar behavior.

Valid Usage

* 
[](#VUID-vkDestroySurfaceKHR-surface-01266) VUID-vkDestroySurfaceKHR-surface-01266

All `VkSwapchainKHR` objects created for `surface` **must** have
been destroyed prior to destroying `surface`

* 
[](#VUID-vkDestroySurfaceKHR-surface-01267) VUID-vkDestroySurfaceKHR-surface-01267

If `VkAllocationCallbacks` were provided when `surface` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySurfaceKHR-surface-01268) VUID-vkDestroySurfaceKHR-surface-01268

If no `VkAllocationCallbacks` were provided when `surface` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySurfaceKHR-instance-parameter) VUID-vkDestroySurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkDestroySurfaceKHR-surface-parameter) VUID-vkDestroySurfaceKHR-surface-parameter

 If `surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkDestroySurfaceKHR-pAllocator-parameter) VUID-vkDestroySurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroySurfaceKHR-surface-parent) VUID-vkDestroySurfaceKHR-surface-parent

 If `surface` is a valid handle, it **must** have been created, allocated, or retrieved from `instance`

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

In some environments applications **can** also present Vulkan rendering
directly to display devices without using an intermediate windowing system.
This **can** be useful for embedded applications, or implementing the
rendering/presentation backend of a windowing system using Vulkan.
The `[VK_KHR_display](../../appendices/extensions.html#VK_KHR_display)` extension provides the functionality necessary
to enumerate display devices and create `VkSurfaceKHR` objects that
target displays.

Displays are represented by `VkDisplayKHR` handles:

// Provided by VK_KHR_display
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDisplayKHR)

Various functions are provided for enumerating the available display devices
present on a Vulkan physical device.
To query information about the available displays, call:

// Provided by VK_KHR_display
VkResult vkGetPhysicalDeviceDisplayPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayPropertiesKHR*                     pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display devices available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkDisplayPropertiesKHR](#VkDisplayPropertiesKHR) structures.

If `pProperties` is `NULL`, then the number of display devices available
for `physicalDevice` is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If the value of `pPropertyCount` is less than the number of display
devices for `physicalDevice`, at most `pPropertyCount` structures
will be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available properties were
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayPropertiesKHR](#VkDisplayPropertiesKHR) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayPropertiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayPropertiesKHR {
    VkDisplayKHR                  display;
    const char*                   displayName;
    VkExtent2D                    physicalDimensions;
    VkExtent2D                    physicalResolution;
    VkSurfaceTransformFlagsKHR    supportedTransforms;
    VkBool32                      planeReorderPossible;
    VkBool32                      persistentContent;
} VkDisplayPropertiesKHR;

* 
`display` is a handle that is used to refer to the display described
here.
This handle will be valid for the lifetime of the Vulkan instance.

* 
`displayName` is `NULL` or a pointer to a null-terminated UTF-8
string containing the name of the display.
Generally, this will be the name provided by the display’s EDID.
If `NULL`, no suitable name is available.
If not `NULL`, the string pointed to **must** remain accessible and
unmodified as long as `display` is valid.

* 
`physicalDimensions` describes the physical width and height of the
visible portion of the display, in millimeters.

* 
`physicalResolution` describes the physical, native, or preferred
resolution of the display.

|  | For devices which have no natural value to return here, implementations
| --- | --- |
**should** return the maximum resolution supported. |

* 
`supportedTransforms` is a bitmask of
[VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) describing which transforms are
supported by this display.

* 
`planeReorderPossible` tells whether the planes on this display **can**
have their z order changed.
If this is [VK_TRUE](../fundamentals.html#VK_TRUE), the application **can** re-arrange the planes on
this display in any order relative to each other.

* 
`persistentContent` tells whether the display supports
self-refresh/internal buffering.
If this is true, the application **can** submit persistent present
operations on swapchains created against this display.

|  | Persistent presents **may** have higher latency, and **may** use less power when
| --- | --- |
the screen content is updated infrequently, or when only a portion of the
screen needs to be updated in most frames. |

To query information about the available displays, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetPhysicalDeviceDisplayProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayProperties2KHR*                    pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display devices available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayProperties2KHR` structures.

`vkGetPhysicalDeviceDisplayProperties2KHR` behaves similarly to
[vkGetPhysicalDeviceDisplayPropertiesKHR](#vkGetPhysicalDeviceDisplayPropertiesKHR), with the ability to return
extended information via chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayProperties2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayProperties2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayProperties2KHR](#VkDisplayProperties2KHR) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayProperties2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayProperties2KHR {
    VkStructureType           sType;
    void*                     pNext;
    VkDisplayPropertiesKHR    displayProperties;
} VkDisplayProperties2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayProperties` is a [VkDisplayPropertiesKHR](#VkDisplayPropertiesKHR) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayProperties2KHR-sType-sType) VUID-VkDisplayProperties2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PROPERTIES_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayProperties2KHR-pNext-pNext) VUID-VkDisplayProperties2KHR-pNext-pNext

 `pNext` **must** be `NULL`

On some platforms, access to displays is limited to a single process or
native driver instance.
On such platforms, some or all of the displays may not be available to
Vulkan if they are already in use by a native windowing system or other
application.

To acquire permission to directly access a display in Vulkan from an X11
server, call:

// Provided by VK_EXT_acquire_xlib_display
VkResult vkAcquireXlibDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    Display*                                    dpy,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`dpy` A connection to the X11 server that currently owns
`display`.

* 
`display` The display the caller wishes to control in Vulkan.

All permissions necessary to control the display are granted to the Vulkan
instance associated with `physicalDevice` until the display is released
or the X11 connection specified by `dpy` is terminated.
Permission to access the display **may** be temporarily revoked during periods
when the X11 server from which control was acquired itself loses access to
`display`.
During such periods, operations which require access to the display **must**
fail with an appropriate error code.
If the X11 server associated with `dpy` does not own `display`, or
if permission to access it has already been acquired by another entity, the
call **must** return the error code [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult).

|  | One example of when an X11 server loses access to a display is when it loses
| --- | --- |
ownership of its virtual terminal. |

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireXlibDisplayEXT-physicalDevice-parameter) VUID-vkAcquireXlibDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkAcquireXlibDisplayEXT-dpy-parameter) VUID-vkAcquireXlibDisplayEXT-dpy-parameter

 `dpy` **must** be a valid pointer to a `Display` value

* 
[](#VUID-vkAcquireXlibDisplayEXT-display-parameter) VUID-vkAcquireXlibDisplayEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkAcquireXlibDisplayEXT-display-parent) VUID-vkAcquireXlibDisplayEXT-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

When acquiring displays from an X11 server, an application may also wish to
enumerate and identify them using a native handle rather than a
`VkDisplayKHR` handle.
To determine the `VkDisplayKHR` handle corresponding to an X11 RandR
Output, call:

// Provided by VK_EXT_acquire_xlib_display
VkResult vkGetRandROutputDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    Display*                                    dpy,
    RROutput                                    rrOutput,
    VkDisplayKHR*                               pDisplay);

* 
`physicalDevice` The physical device to query the display handle on.

* 
`dpy` A connection to the X11 server from which `rrOutput` was
queried.

* 
`rrOutput` An X11 RandR output ID.

* 
`pDisplay` The corresponding [VkDisplayKHR](#VkDisplayKHR) handle will be
returned here.

If there is no [VkDisplayKHR](#VkDisplayKHR) corresponding to `rrOutput` on
`physicalDevice`, [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be returned in
`pDisplay`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRandROutputDisplayEXT-physicalDevice-parameter) VUID-vkGetRandROutputDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetRandROutputDisplayEXT-dpy-parameter) VUID-vkGetRandROutputDisplayEXT-dpy-parameter

 `dpy` **must** be a valid pointer to a `Display` value

* 
[](#VUID-vkGetRandROutputDisplayEXT-pDisplay-parameter) VUID-vkGetRandROutputDisplayEXT-pDisplay-parameter

 `pDisplay` **must** be a valid pointer to a [VkDisplayKHR](#VkDisplayKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To acquire permission to directly access a display in Vulkan on Windows 10,
call:

// Provided by VK_NV_acquire_winrt_display
VkResult vkAcquireWinrtDisplayNV(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`display` The display the caller wishes to control in Vulkan.

All permissions necessary to control the display are granted to the Vulkan
instance associated with `physicalDevice` until the display is released
or the application is terminated.
Permission to access the display **may** be revoked by events that cause
Windows 10 itself to lose access to `display`.
If this has happened, operations which require access to the display **must**
fail with an appropriate error code.
If permission to access `display` has already been acquired by another
entity, the call **must** return the error code
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult).

|  | The Vulkan instance acquires control of a
| --- | --- |
[“winrt::Windows::Devices::Display::Core::DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget)
by performing an operation equivalent to
[“winrt::Windows::Devices::Display::Core::DisplayManager.TryAcquireTarget()”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaymanager.tryacquiretarget)
on the “DisplayTarget”. |

|  | One example of when Windows 10 loses access to a display is when the display
| --- | --- |
is hot-unplugged. |

|  | One example of when a display has already been acquired by another entity is
| --- | --- |
when the Windows desktop compositor (DWM) is in control of the display.
Beginning with Windows 10 version 2004 it is possible to cause DWM to
release a display by using the “Advanced display settings” sub-page of the
“Display settings” control panel.
[vkAcquireWinrtDisplayNV](#vkAcquireWinrtDisplayNV) does not itself cause DWM to release a
display; this action must be performed outside of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireWinrtDisplayNV-physicalDevice-parameter) VUID-vkAcquireWinrtDisplayNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkAcquireWinrtDisplayNV-display-parameter) VUID-vkAcquireWinrtDisplayNV-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkAcquireWinrtDisplayNV-display-parent) VUID-vkAcquireWinrtDisplayNV-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

When acquiring displays on Windows 10, an application may also wish to
enumerate and identify them using a native handle rather than a
`VkDisplayKHR` handle.

To determine the `VkDisplayKHR` handle corresponding to a
[“winrt::Windows::Devices::Display::Core::DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget),
call:

// Provided by VK_NV_acquire_winrt_display
VkResult vkGetWinrtDisplayNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    deviceRelativeId,
    VkDisplayKHR*                               pDisplay);

* 
`physicalDevice` The physical device on which to query the display
handle.

* 
`deviceRelativeId` The value of the
[“AdapterRelativeId”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget.adapterrelativeid)
property of a
[“DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget)
that is enumerated by a
[“DisplayAdapter”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displayadapter)
with an
[“Id”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displayadapter.id)
property matching the `deviceLUID` property of a
[VkPhysicalDeviceIDProperties](../devsandqueues.html#VkPhysicalDeviceIDProperties) for `physicalDevice`.

* 
`pDisplay` The corresponding [VkDisplayKHR](#VkDisplayKHR) handle will be
returned here.

If there is no [VkDisplayKHR](#VkDisplayKHR) corresponding to `deviceRelativeId` on
`physicalDevice`, [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be returned in
`pDisplay`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetWinrtDisplayNV-physicalDevice-parameter) VUID-vkGetWinrtDisplayNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetWinrtDisplayNV-pDisplay-parameter) VUID-vkGetWinrtDisplayNV-pDisplay-parameter

 `pDisplay` **must** be a valid pointer to a [VkDisplayKHR](#VkDisplayKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To acquire permission to directly a display in Vulkan from the Direct
Rendering Manager (DRM) interface, call:

// Provided by VK_EXT_acquire_drm_display
VkResult vkAcquireDrmDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    int32_t                                     drmFd,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`drmFd` DRM primary file descriptor.

* 
`display` The display the caller wishes Vulkan to control.

All permissions necessary to control the display are granted to the Vulkan
instance associated with the provided `physicalDevice` until the display
is either released or the connector is unplugged.
The provided `drmFd` **must** correspond to the one owned by the
`physicalDevice`.
If not, the error code [VK_ERROR_UNKNOWN](../fundamentals.html#VkResult) **must** be returned.
The DRM FD must have DRM mast⁠er permissions.
If any error is encountered during the acquisition of the display, the call
**must** return the error code [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult).

The provided DRM fd should not be closed before the display is released,
attempting to do it may result in **undefined** behavior.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireDrmDisplayEXT-physicalDevice-parameter) VUID-vkAcquireDrmDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkAcquireDrmDisplayEXT-display-parameter) VUID-vkAcquireDrmDisplayEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkAcquireDrmDisplayEXT-display-parent) VUID-vkAcquireDrmDisplayEXT-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

Before acquiring a display from the DRM interface, the caller may want to
select a specific `VkDisplayKHR` handle by identifying it using a
`connectorId`.
To do so, call:

// Provided by VK_EXT_acquire_drm_display
VkResult vkGetDrmDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    int32_t                                     drmFd,
    uint32_t                                    connectorId,
    VkDisplayKHR*                               display);

* 
`physicalDevice` The physical device to query the display from.

* 
`drmFd` DRM primary file descriptor.

* 
`connectorId` Identifier of the specified DRM connector.

* 
`display` The corresponding [VkDisplayKHR](#VkDisplayKHR) handle will be
returned here.

If there is no [VkDisplayKHR](#VkDisplayKHR) corresponding to the `connectorId` on
the `physicalDevice`, the returning `display` **must** be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE).
The provided `drmFd` **must** correspond to the one owned by the
`physicalDevice`.
If not, the error code [VK_ERROR_UNKNOWN](../fundamentals.html#VkResult) **must** be returned.
Mast⁠er permissions are not required, because the file descriptor is just
used for information gathering purposes.
The given `connectorId` **must** be a resource owned by the provided
`drmFd`.
If not, the error code [VK_ERROR_UNKNOWN](../fundamentals.html#VkResult) **must** be returned.
If any error is encountered during the identification of the display, the
call **must** return the error code [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult).

Valid Usage (Implicit)

* 
[](#VUID-vkGetDrmDisplayEXT-physicalDevice-parameter) VUID-vkGetDrmDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetDrmDisplayEXT-display-parameter) VUID-vkGetDrmDisplayEXT-display-parameter

 `display` **must** be a valid pointer to a [VkDisplayKHR](#VkDisplayKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To release a previously acquired display, call:

// Provided by VK_EXT_direct_mode_display
VkResult vkReleaseDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`display` The display to release control of.

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseDisplayEXT-physicalDevice-parameter) VUID-vkReleaseDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkReleaseDisplayEXT-display-parameter) VUID-vkReleaseDisplayEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkReleaseDisplayEXT-display-parent) VUID-vkReleaseDisplayEXT-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

Images are presented to individual planes on a display.
Devices **must** support at least one plane on each display.
Planes **can** be stacked and blended to composite multiple images on one
display.
Devices **may** support only a fixed stacking order and fixed mapping between
planes and displays, or they **may** allow arbitrary application-specified
stacking orders and mappings between planes and displays.
To query the properties of device display planes, call:

// Provided by VK_KHR_display
VkResult vkGetPhysicalDeviceDisplayPlanePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayPlanePropertiesKHR*                pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display planes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayPlanePropertiesKHR` structures.

If `pProperties` is `NULL`, then the number of display planes available
for `physicalDevice` is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If the value of `pPropertyCount` is less than the number of display
planes for `physicalDevice`, at most `pPropertyCount` structures
will be written.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayPlanePropertiesKHR](#VkDisplayPlanePropertiesKHR) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayPlanePropertiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayPlanePropertiesKHR {
    VkDisplayKHR    currentDisplay;
    uint32_t        currentStackIndex;
} VkDisplayPlanePropertiesKHR;

* 
`currentDisplay` is the handle of the display the plane is currently
associated with.
If the plane is not currently attached to any displays, this will be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE).

* 
`currentStackIndex` is the current z-order of the plane.
This will be between 0 and the value returned by
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR` in
`pPropertyCount`.

To query the properties of a device’s display planes, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetPhysicalDeviceDisplayPlaneProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayPlaneProperties2KHR*               pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display planes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayPlaneProperties2KHR` structures.

`vkGetPhysicalDeviceDisplayPlaneProperties2KHR` behaves similarly to
[vkGetPhysicalDeviceDisplayPlanePropertiesKHR](#vkGetPhysicalDeviceDisplayPlanePropertiesKHR), with the ability to
return extended information via chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayPlaneProperties2KHR](#VkDisplayPlaneProperties2KHR) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayPlaneProperties2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayPlaneProperties2KHR {
    VkStructureType                sType;
    void*                          pNext;
    VkDisplayPlanePropertiesKHR    displayPlaneProperties;
} VkDisplayPlaneProperties2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayPlaneProperties` is a [VkDisplayPlanePropertiesKHR](#VkDisplayPlanePropertiesKHR)
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPlaneProperties2KHR-sType-sType) VUID-VkDisplayPlaneProperties2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PLANE_PROPERTIES_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayPlaneProperties2KHR-pNext-pNext) VUID-VkDisplayPlaneProperties2KHR-pNext-pNext

 `pNext` **must** be `NULL`

To determine which displays a plane is usable with, call

// Provided by VK_KHR_display
VkResult vkGetDisplayPlaneSupportedDisplaysKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    planeIndex,
    uint32_t*                                   pDisplayCount,
    VkDisplayKHR*                               pDisplays);

* 
`physicalDevice` is a physical device.

* 
`planeIndex` is the plane which the application wishes to use, and
**must** be in the range [0, physical device plane count - 1].

* 
`pDisplayCount` is a pointer to an integer related to the number of
displays available or queried, as described below.

* 
`pDisplays` is either `NULL` or a pointer to an array of
`VkDisplayKHR` handles.

If `pDisplays` is `NULL`, then the number of displays usable with the
specified `planeIndex` for `physicalDevice` is returned in
`pDisplayCount`.
Otherwise, `pDisplayCount` **must** point to a variable set by the
application to the number of elements in the `pDisplays` array, and on
return the variable is overwritten with the number of handles actually
written to `pDisplays`.
If the value of `pDisplayCount` is less than the number of usable
display-plane pairs for `physicalDevice`, at most `pDisplayCount`
handles will be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available pairs were
returned.

Valid Usage

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-planeIndex-01249) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-planeIndex-01249

`planeIndex` **must** be less than the number of display planes
supported by the device as determined by calling
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-physicalDevice-parameter) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplayCount-parameter) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplayCount-parameter

 `pDisplayCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplays-parameter) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplays-parameter

 If the value referenced by `pDisplayCount` is not `0`, and `pDisplays` is not `NULL`, `pDisplays` **must** be a valid pointer to an array of `pDisplayCount` [VkDisplayKHR](#VkDisplayKHR) handles

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

Additional properties of displays are queried using specialized query
functions.

Display modes are represented by `VkDisplayModeKHR` handles:

// Provided by VK_KHR_display
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDisplayModeKHR)

Each display has one or more supported modes associated with it by default.
These built-in modes are queried by calling:

// Provided by VK_KHR_display
VkResult vkGetDisplayModePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display,
    uint32_t*                                   pPropertyCount,
    VkDisplayModePropertiesKHR*                 pProperties);

* 
`physicalDevice` is the physical device associated with
`display`.

* 
`display` is the display to query.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display modes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayModePropertiesKHR` structures.

If `pProperties` is `NULL`, then the number of display modes available
on the specified `display` for `physicalDevice` is returned in
`pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If the value of `pPropertyCount` is less than the number of display
modes for `physicalDevice`, at most `pPropertyCount` structures will
be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available display modes were
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayModePropertiesKHR-physicalDevice-parameter) VUID-vkGetDisplayModePropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetDisplayModePropertiesKHR-display-parameter) VUID-vkGetDisplayModePropertiesKHR-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkGetDisplayModePropertiesKHR-pPropertyCount-parameter) VUID-vkGetDisplayModePropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDisplayModePropertiesKHR-pProperties-parameter) VUID-vkGetDisplayModePropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayModePropertiesKHR](#VkDisplayModePropertiesKHR) structures

* 
[](#VUID-vkGetDisplayModePropertiesKHR-display-parent) VUID-vkGetDisplayModePropertiesKHR-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayModePropertiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayModePropertiesKHR {
    VkDisplayModeKHR              displayMode;
    VkDisplayModeParametersKHR    parameters;
} VkDisplayModePropertiesKHR;

* 
`displayMode` is a handle to the display mode described in this
structure.
This handle will be valid for the lifetime of the Vulkan instance.

* 
`parameters` is a [VkDisplayModeParametersKHR](#VkDisplayModeParametersKHR) structure
describing the display parameters associated with `displayMode`.

// Provided by VK_KHR_display
typedef VkFlags VkDisplayModeCreateFlagsKHR;

`VkDisplayModeCreateFlagsKHR` is a bitmask type for setting a mask, but
is currently reserved for future use.

To query the properties of a device’s built-in display modes, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetDisplayModeProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display,
    uint32_t*                                   pPropertyCount,
    VkDisplayModeProperties2KHR*                pProperties);

* 
`physicalDevice` is the physical device associated with
`display`.

* 
`display` is the display to query.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display modes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayModeProperties2KHR` structures.

`vkGetDisplayModeProperties2KHR` behaves similarly to
[vkGetDisplayModePropertiesKHR](#vkGetDisplayModePropertiesKHR), with the ability to return extended
information via chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayModeProperties2KHR-physicalDevice-parameter) VUID-vkGetDisplayModeProperties2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetDisplayModeProperties2KHR-display-parameter) VUID-vkGetDisplayModeProperties2KHR-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkGetDisplayModeProperties2KHR-pPropertyCount-parameter) VUID-vkGetDisplayModeProperties2KHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDisplayModeProperties2KHR-pProperties-parameter) VUID-vkGetDisplayModeProperties2KHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayModeProperties2KHR](#VkDisplayModeProperties2KHR) structures

* 
[](#VUID-vkGetDisplayModeProperties2KHR-display-parent) VUID-vkGetDisplayModeProperties2KHR-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayModeProperties2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayModeProperties2KHR {
    VkStructureType               sType;
    void*                         pNext;
    VkDisplayModePropertiesKHR    displayModeProperties;
} VkDisplayModeProperties2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayModeProperties` is a [VkDisplayModePropertiesKHR](#VkDisplayModePropertiesKHR)
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayModeProperties2KHR-sType-sType) VUID-VkDisplayModeProperties2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_MODE_PROPERTIES_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayModeProperties2KHR-pNext-pNext) VUID-VkDisplayModeProperties2KHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDisplayModeStereoPropertiesNV](#VkDisplayModeStereoPropertiesNV)

* 
[](#VUID-VkDisplayModeProperties2KHR-sType-unique) VUID-VkDisplayModeProperties2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

The `VkDisplayModeParametersKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayModeParametersKHR {
    VkExtent2D    visibleRegion;
    uint32_t      refreshRate;
} VkDisplayModeParametersKHR;

* 
`visibleRegion` is the 2D extents of the visible region.

* 
`refreshRate` is a `uint32_t` that is the number of times the
display is refreshed each second multiplied by 1000.

|  | For example, a 60Hz display mode would report a `refreshRate` of 60,000. |
| --- | --- |

Valid Usage

* 
[](#VUID-VkDisplayModeParametersKHR-width-01990) VUID-VkDisplayModeParametersKHR-width-01990

The `width` member of `visibleRegion` **must** be greater than `0`

* 
[](#VUID-VkDisplayModeParametersKHR-height-01991) VUID-VkDisplayModeParametersKHR-height-01991

The `height` member of `visibleRegion` **must** be greater than `0`

* 
[](#VUID-VkDisplayModeParametersKHR-refreshRate-01992) VUID-VkDisplayModeParametersKHR-refreshRate-01992

`refreshRate` **must** be greater than `0`

The `VkDisplayModeStereoPropertiesNV` structure is defined as:

// Provided by VK_NV_display_stereo
typedef struct VkDisplayModeStereoPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdmi3DSupported;
} VkDisplayModeStereoPropertiesNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hdmi3DSupported` indicates whether this display mode can be used
for a display surface configured for
[VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV](#VkDisplaySurfaceStereoTypeNV).

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayModeStereoPropertiesNV-sType-sType) VUID-VkDisplayModeStereoPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_MODE_STEREO_PROPERTIES_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDisplayModeProperties2KHR](#VkDisplayModeProperties2KHR)

Additional modes **may** also be created by calling:

// Provided by VK_KHR_display
VkResult vkCreateDisplayModeKHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display,
    const VkDisplayModeCreateInfoKHR*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDisplayModeKHR*                           pMode);

* 
`physicalDevice` is the physical device associated with
`display`.

* 
`display` is the display to create an additional mode for.

* 
`pCreateInfo` is a pointer to a [VkDisplayModeCreateInfoKHR](#VkDisplayModeCreateInfoKHR)
structure describing the new mode to create.

* 
`pAllocator` is the allocator used for host memory allocated for the
display mode object when there is no more specific allocator available
(see [Memory Allocation](../memory.html#memory-allocation)).

* 
`pMode` is a pointer to a [VkDisplayModeKHR](#VkDisplayModeKHR) handle in which the
mode created is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDisplayModeKHR-physicalDevice-parameter) VUID-vkCreateDisplayModeKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkCreateDisplayModeKHR-display-parameter) VUID-vkCreateDisplayModeKHR-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkCreateDisplayModeKHR-pCreateInfo-parameter) VUID-vkCreateDisplayModeKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDisplayModeCreateInfoKHR](#VkDisplayModeCreateInfoKHR) structure

* 
[](#VUID-vkCreateDisplayModeKHR-pAllocator-parameter) VUID-vkCreateDisplayModeKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDisplayModeKHR-pMode-parameter) VUID-vkCreateDisplayModeKHR-pMode-parameter

 `pMode` **must** be a valid pointer to a [VkDisplayModeKHR](#VkDisplayModeKHR) handle

* 
[](#VUID-vkCreateDisplayModeKHR-display-parent) VUID-vkCreateDisplayModeKHR-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Host Synchronization

* 
Host access to `display` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayModeCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayModeCreateInfoKHR {
    VkStructureType                sType;
    const void*                    pNext;
    VkDisplayModeCreateFlagsKHR    flags;
    VkDisplayModeParametersKHR     parameters;
} VkDisplayModeCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use, and **must** be zero.

* 
`parameters` is a [VkDisplayModeParametersKHR](#VkDisplayModeParametersKHR) structure
describing the display parameters to use in creating the new mode.
If the parameters are not compatible with the specified display, the
implementation **must** return [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult).

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayModeCreateInfoKHR-sType-sType) VUID-VkDisplayModeCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_MODE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayModeCreateInfoKHR-pNext-pNext) VUID-VkDisplayModeCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayModeCreateInfoKHR-flags-zerobitmask) VUID-VkDisplayModeCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDisplayModeCreateInfoKHR-parameters-parameter) VUID-VkDisplayModeCreateInfoKHR-parameters-parameter

 `parameters` **must** be a valid [VkDisplayModeParametersKHR](#VkDisplayModeParametersKHR) structure

Applications that wish to present directly to a display **must** select which
layer, or “plane” of the display they wish to target, and a mode to use
with the display.
Each display supports at least one plane.
The capabilities of a given mode and plane combination are determined by
calling:

// Provided by VK_KHR_display
VkResult vkGetDisplayPlaneCapabilitiesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayModeKHR                            mode,
    uint32_t                                    planeIndex,
    VkDisplayPlaneCapabilitiesKHR*              pCapabilities);

* 
`physicalDevice` is the physical device associated with the display
specified by `mode`

* 
`mode` is the display mode the application intends to program when
using the specified plane.
Note this parameter also implicitly specifies a display.

* 
`planeIndex` is the plane which the application intends to use with
the display, and is less than the number of display planes supported by
the device.

* 
`pCapabilities` is a pointer to a
[VkDisplayPlaneCapabilitiesKHR](#VkDisplayPlaneCapabilitiesKHR) structure in which the capabilities
are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-physicalDevice-parameter) VUID-vkGetDisplayPlaneCapabilitiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parameter) VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parameter

 `mode` **must** be a valid [VkDisplayModeKHR](#VkDisplayModeKHR) handle

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-pCapabilities-parameter) VUID-vkGetDisplayPlaneCapabilitiesKHR-pCapabilities-parameter

 `pCapabilities` **must** be a valid pointer to a [VkDisplayPlaneCapabilitiesKHR](#VkDisplayPlaneCapabilitiesKHR) structure

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parent) VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parent

 `mode` **must** have been created, allocated, or retrieved from `physicalDevice`

Host Synchronization

* 
Host access to `mode` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayPlaneCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayPlaneCapabilitiesKHR {
    VkDisplayPlaneAlphaFlagsKHR    supportedAlpha;
    VkOffset2D                     minSrcPosition;
    VkOffset2D                     maxSrcPosition;
    VkExtent2D                     minSrcExtent;
    VkExtent2D                     maxSrcExtent;
    VkOffset2D                     minDstPosition;
    VkOffset2D                     maxDstPosition;
    VkExtent2D                     minDstExtent;
    VkExtent2D                     maxDstExtent;
} VkDisplayPlaneCapabilitiesKHR;

* 
`supportedAlpha` is a bitmask of
[VkDisplayPlaneAlphaFlagBitsKHR](#VkDisplayPlaneAlphaFlagBitsKHR) describing the supported alpha
blending modes.

* 
`minSrcPosition` is the minimum source rectangle offset supported by
this plane using the specified mode.

* 
`maxSrcPosition` is the maximum source rectangle offset supported by
this plane using the specified mode.
The `x` and `y` components of `maxSrcPosition` **must** each be
greater than or equal to the `x` and `y` components of
`minSrcPosition`, respectively.

* 
`minSrcExtent` is the minimum source rectangle size supported by
this plane using the specified mode.

* 
`maxSrcExtent` is the maximum source rectangle size supported by
this plane using the specified mode.

* 
`minDstPosition`, `maxDstPosition`, `minDstExtent`,
`maxDstExtent` all have similar semantics to their corresponding
`*Src*` equivalents, but apply to the output region within the mode
rather than the input region within the source image.
Unlike the `*Src*` offsets, `minDstPosition` and
`maxDstPosition` **may** contain negative values.

The minimum and maximum position and extent fields describe the
implementation limits, if any, as they apply to the specified display mode
and plane.
Vendors **may** support displaying a subset of a swapchain’s presentable images
on the specified display plane.
This is expressed by returning `minSrcPosition`, `maxSrcPosition`,
`minSrcExtent`, and `maxSrcExtent` values that indicate a range of
possible positions and sizes which **may** be used to specify the region within
the presentable images that source pixels will be read from when creating a
swapchain on the specified display mode and plane.

Vendors **may** also support mapping the presentable images’ content to a
subset or superset of the visible region in the specified display mode.
This is expressed by returning `minDstPosition`, `maxDstPosition`,
`minDstExtent` and `maxDstExtent` values that indicate a range of
possible positions and sizes which **may** be used to describe the region
within the display mode that the source pixels will be mapped to.

Other vendors **may** support only a 1-1 mapping between pixels in the
presentable images and the display mode.
This **may** be indicated by returning (0,0) for `minSrcPosition`,
`maxSrcPosition`, `minDstPosition`, and `maxDstPosition`, and
(display mode width, display mode height) for `minSrcExtent`,
`maxSrcExtent`, `minDstExtent`, and `maxDstExtent`.

The value `supportedAlpha` **must** contain at least one valid
[VkDisplayPlaneAlphaFlagBitsKHR](#VkDisplayPlaneAlphaFlagBitsKHR) bit.

These values indicate the limits of the implementation’s individual fields.
Not all combinations of values within the offset and extent ranges returned
in `VkDisplayPlaneCapabilitiesKHR` are guaranteed to be supported.
Presentation requests specifying unsupported combinations **may** fail.

To query the capabilities of a given mode and plane combination, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetDisplayPlaneCapabilities2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkDisplayPlaneInfo2KHR*               pDisplayPlaneInfo,
    VkDisplayPlaneCapabilities2KHR*             pCapabilities);

* 
`physicalDevice` is the physical device associated with
`pDisplayPlaneInfo`.

* 
`pDisplayPlaneInfo` is a pointer to a [VkDisplayPlaneInfo2KHR](#VkDisplayPlaneInfo2KHR)
structure describing the plane and mode.

* 
`pCapabilities` is a pointer to a
[VkDisplayPlaneCapabilities2KHR](#VkDisplayPlaneCapabilities2KHR) structure in which the capabilities
are returned.

`vkGetDisplayPlaneCapabilities2KHR` behaves similarly to
[vkGetDisplayPlaneCapabilitiesKHR](#vkGetDisplayPlaneCapabilitiesKHR), with the ability to specify extended
inputs via chained input structures, and to return extended information via
chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayPlaneCapabilities2KHR-physicalDevice-parameter) VUID-vkGetDisplayPlaneCapabilities2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetDisplayPlaneCapabilities2KHR-pDisplayPlaneInfo-parameter) VUID-vkGetDisplayPlaneCapabilities2KHR-pDisplayPlaneInfo-parameter

 `pDisplayPlaneInfo` **must** be a valid pointer to a valid [VkDisplayPlaneInfo2KHR](#VkDisplayPlaneInfo2KHR) structure

* 
[](#VUID-vkGetDisplayPlaneCapabilities2KHR-pCapabilities-parameter) VUID-vkGetDisplayPlaneCapabilities2KHR-pCapabilities-parameter

 `pCapabilities` **must** be a valid pointer to a [VkDisplayPlaneCapabilities2KHR](#VkDisplayPlaneCapabilities2KHR) structure

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayPlaneInfo2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayPlaneInfo2KHR {
    VkStructureType     sType;
    const void*         pNext;
    VkDisplayModeKHR    mode;
    uint32_t            planeIndex;
} VkDisplayPlaneInfo2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` is the display mode the application intends to program when
using the specified plane.

|  | This parameter also implicitly specifies a display. |
| --- | --- |

* 
`planeIndex` is the plane which the application intends to use with
the display.

The members of `VkDisplayPlaneInfo2KHR` correspond to the arguments to
[vkGetDisplayPlaneCapabilitiesKHR](#vkGetDisplayPlaneCapabilitiesKHR), with `sType` and `pNext`
added for extensibility.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPlaneInfo2KHR-sType-sType) VUID-VkDisplayPlaneInfo2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PLANE_INFO_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayPlaneInfo2KHR-pNext-pNext) VUID-VkDisplayPlaneInfo2KHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayPlaneInfo2KHR-mode-parameter) VUID-VkDisplayPlaneInfo2KHR-mode-parameter

 `mode` **must** be a valid [VkDisplayModeKHR](#VkDisplayModeKHR) handle

Host Synchronization

* 
Host access to `mode` **must** be externally synchronized

The `VkDisplayPlaneCapabilities2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayPlaneCapabilities2KHR {
    VkStructureType                  sType;
    void*                            pNext;
    VkDisplayPlaneCapabilitiesKHR    capabilities;
} VkDisplayPlaneCapabilities2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`capabilities` is a [VkDisplayPlaneCapabilitiesKHR](#VkDisplayPlaneCapabilitiesKHR) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPlaneCapabilities2KHR-sType-sType) VUID-VkDisplayPlaneCapabilities2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PLANE_CAPABILITIES_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayPlaneCapabilities2KHR-pNext-pNext) VUID-VkDisplayPlaneCapabilities2KHR-pNext-pNext

 `pNext` **must** be `NULL`

To set the power state of a display, call:

// Provided by VK_EXT_display_control
VkResult vkDisplayPowerControlEXT(
    VkDevice                                    device,
    VkDisplayKHR                                display,
    const VkDisplayPowerInfoEXT*                pDisplayPowerInfo);

* 
`device` is a logical device associated with `display`.

* 
`display` is the display whose power state is modified.

* 
`pDisplayPowerInfo` is a pointer to a [VkDisplayPowerInfoEXT](#VkDisplayPowerInfoEXT)
structure specifying the new power state of `display`.

Valid Usage (Implicit)

* 
[](#VUID-vkDisplayPowerControlEXT-device-parameter) VUID-vkDisplayPowerControlEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDisplayPowerControlEXT-display-parameter) VUID-vkDisplayPowerControlEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](#VkDisplayKHR) handle

* 
[](#VUID-vkDisplayPowerControlEXT-pDisplayPowerInfo-parameter) VUID-vkDisplayPowerControlEXT-pDisplayPowerInfo-parameter

 `pDisplayPowerInfo` **must** be a valid pointer to a valid [VkDisplayPowerInfoEXT](#VkDisplayPowerInfoEXT) structure

* 
[](#VUID-vkDisplayPowerControlEXT-commonparent) VUID-vkDisplayPowerControlEXT-commonparent

 Both of `device`, and `display` **must** have been created, allocated, or retrieved from the same [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice)

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplayPowerInfoEXT` structure is defined as:

// Provided by VK_EXT_display_control
typedef struct VkDisplayPowerInfoEXT {
    VkStructureType           sType;
    const void*               pNext;
    VkDisplayPowerStateEXT    powerState;
} VkDisplayPowerInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`powerState` is a [VkDisplayPowerStateEXT](#VkDisplayPowerStateEXT) value specifying the
new power state of the display.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPowerInfoEXT-sType-sType) VUID-VkDisplayPowerInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_POWER_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplayPowerInfoEXT-pNext-pNext) VUID-VkDisplayPowerInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayPowerInfoEXT-powerState-parameter) VUID-VkDisplayPowerInfoEXT-powerState-parameter

 `powerState` **must** be a valid [VkDisplayPowerStateEXT](#VkDisplayPowerStateEXT) value

Possible values of [VkDisplayPowerInfoEXT](#VkDisplayPowerInfoEXT)::`powerState`, specifying
the new power state of a display, are:

// Provided by VK_EXT_display_control
typedef enum VkDisplayPowerStateEXT {
    VK_DISPLAY_POWER_STATE_OFF_EXT = 0,
    VK_DISPLAY_POWER_STATE_SUSPEND_EXT = 1,
    VK_DISPLAY_POWER_STATE_ON_EXT = 2,
} VkDisplayPowerStateEXT;

* 
[VK_DISPLAY_POWER_STATE_OFF_EXT](#VkDisplayPowerStateEXT) specifies that the display is
powered down.

* 
[VK_DISPLAY_POWER_STATE_SUSPEND_EXT](#VkDisplayPowerStateEXT) specifies that the display is
put into a low power mode, from which it **may** be able to transition back
to [VK_DISPLAY_POWER_STATE_ON_EXT](#VkDisplayPowerStateEXT) more quickly than if it were in
[VK_DISPLAY_POWER_STATE_OFF_EXT](#VkDisplayPowerStateEXT).
This state **may** be the same as [VK_DISPLAY_POWER_STATE_OFF_EXT](#VkDisplayPowerStateEXT).

* 
[VK_DISPLAY_POWER_STATE_ON_EXT](#VkDisplayPowerStateEXT) specifies that the display is
powered on.

A complete display configuration includes a mode, one or more display planes
and any parameters describing their behavior, and parameters describing some
aspects of the images associated with those planes.
Display surfaces describe the configuration of a single plane within a
complete display configuration.
To create a `VkSurfaceKHR` object for a display plane, call:

// Provided by VK_KHR_display
VkResult vkCreateDisplayPlaneSurfaceKHR(
    VkInstance                                  instance,
    const VkDisplaySurfaceCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance corresponding to the physical device the
targeted display is on.

* 
`pCreateInfo` is a pointer to a [VkDisplaySurfaceCreateInfoKHR](#VkDisplaySurfaceCreateInfoKHR)
structure specifying which mode, plane, and other parameters to use, as
described below.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-instance-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-pCreateInfo-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDisplaySurfaceCreateInfoKHR](#VkDisplaySurfaceCreateInfoKHR) structure

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-pAllocator-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDisplayPlaneSurfaceKHR-pSurface-parameter) VUID-vkCreateDisplayPlaneSurfaceKHR-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDisplaySurfaceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplaySurfaceCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkDisplaySurfaceCreateFlagsKHR    flags;
    VkDisplayModeKHR                  displayMode;
    uint32_t                          planeIndex;
    uint32_t                          planeStackIndex;
    VkSurfaceTransformFlagBitsKHR     transform;
    float                             globalAlpha;
    VkDisplayPlaneAlphaFlagBitsKHR    alphaMode;
    VkExtent2D                        imageExtent;
} VkDisplaySurfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use, and **must** be zero.

* 
`displayMode` is a [VkDisplayModeKHR](#VkDisplayModeKHR) handle specifying the mode
to use when displaying this surface.

* 
`planeIndex` is the plane on which this surface appears.

* 
`planeStackIndex` is the z-order of the plane.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) value
specifying the transformation to apply to images as part of the scanout
operation.

* 
`globalAlpha` is the global alpha value.
This value is ignored if `alphaMode` is not
[VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR).

* 
`alphaMode` is a [VkDisplayPlaneAlphaFlagBitsKHR](#VkDisplayPlaneAlphaFlagBitsKHR) value
specifying the type of alpha blending to use.

* 
`imageExtent` is the size of the presentable images to use with the
surface.

|  | Creating a display surface **must** not modify the state of the displays,
| --- | --- |
planes, or other resources it names.
For example, it **must** not apply the specified mode to be set on the
associated display.
Application of display configuration occurs as a side effect of presenting
to a display surface. |

Valid Usage

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-planeIndex-01252) VUID-VkDisplaySurfaceCreateInfoKHR-planeIndex-01252

`planeIndex` **must** be less than the number of display planes
supported by the device as determined by calling
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-planeReorderPossible-01253) VUID-VkDisplaySurfaceCreateInfoKHR-planeReorderPossible-01253

If the `planeReorderPossible` member of the
`VkDisplayPropertiesKHR` structure returned by
`vkGetPhysicalDeviceDisplayPropertiesKHR` for the display
corresponding to `displayMode` is [VK_TRUE](../fundamentals.html#VK_TRUE) then
`planeStackIndex` **must** be less than the number of display planes
supported by the device as determined by calling
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR`; otherwise
`planeStackIndex` **must** equal the `currentStackIndex` member of
`VkDisplayPlanePropertiesKHR` returned by
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR` for the display plane
corresponding to `displayMode`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01254) VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01254

If `alphaMode` is [VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR) then
`globalAlpha` **must** be between `0` and `1`, inclusive

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01255) VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-01255

`alphaMode` **must** be one of the bits present in the
`supportedAlpha` member of `VkDisplayPlaneCapabilitiesKHR` for
the display plane corresponding to `displayMode`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-transform-06740) VUID-VkDisplaySurfaceCreateInfoKHR-transform-06740

`transform` **must** be one of the bits present in the
`supportedTransforms` member of `VkDisplayPropertiesKHR` for the
display corresponding to `displayMode`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-width-01256) VUID-VkDisplaySurfaceCreateInfoKHR-width-01256

The `width` and `height` members of `imageExtent` **must** be
less than or equal to
[VkPhysicalDeviceLimits](../limits.html#VkPhysicalDeviceLimits)::`maxImageDimension2D`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-pNext-10284) VUID-VkDisplaySurfaceCreateInfoKHR-pNext-10284

If the `pNext` chain includes a
[VkDisplaySurfaceStereoCreateInfoNV](#VkDisplaySurfaceStereoCreateInfoNV) structure whose
`stereoType` member is
[VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV](#VkDisplaySurfaceStereoTypeNV), then the
`hdmi3DSupported` member of the
[VkDisplayModeStereoPropertiesNV](#VkDisplayModeStereoPropertiesNV) structure in the `pNext` chain
of the `VkDisplayModeProperties2KHR` structure returned by
[vkGetDisplayModeProperties2KHR](#vkGetDisplayModeProperties2KHR) for the display mode corresponding
to `displayMode` **must** be [VK_TRUE](../fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-sType-sType) VUID-VkDisplaySurfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_SURFACE_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-pNext-pNext) VUID-VkDisplaySurfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDisplaySurfaceStereoCreateInfoNV](#VkDisplaySurfaceStereoCreateInfoNV)

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-sType-unique) VUID-VkDisplaySurfaceCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-flags-zerobitmask) VUID-VkDisplaySurfaceCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-displayMode-parameter) VUID-VkDisplaySurfaceCreateInfoKHR-displayMode-parameter

 `displayMode` **must** be a valid [VkDisplayModeKHR](#VkDisplayModeKHR) handle

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-transform-parameter) VUID-VkDisplaySurfaceCreateInfoKHR-transform-parameter

 `transform` **must** be a valid [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) value

* 
[](#VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-parameter) VUID-VkDisplaySurfaceCreateInfoKHR-alphaMode-parameter

 `alphaMode` **must** be a valid [VkDisplayPlaneAlphaFlagBitsKHR](#VkDisplayPlaneAlphaFlagBitsKHR) value

// Provided by VK_KHR_display
typedef VkFlags VkDisplaySurfaceCreateFlagsKHR;

`VkDisplaySurfaceCreateFlagsKHR` is a bitmask type for setting a mask,
but is currently reserved for future use.

Bits which **can** be set in
[VkDisplaySurfaceCreateInfoKHR](#VkDisplaySurfaceCreateInfoKHR)::`alphaMode`, specifying the type of
alpha blending to use on a display, are:

// Provided by VK_KHR_display
typedef enum VkDisplayPlaneAlphaFlagBitsKHR {
    VK_DISPLAY_PLANE_ALPHA_OPAQUE_BIT_KHR = 0x00000001,
    VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR = 0x00000002,
    VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_BIT_KHR = 0x00000004,
    VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_PREMULTIPLIED_BIT_KHR = 0x00000008,
} VkDisplayPlaneAlphaFlagBitsKHR;

* 
[VK_DISPLAY_PLANE_ALPHA_OPAQUE_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR) specifies that the source
image will be treated as opaque.

* 
[VK_DISPLAY_PLANE_ALPHA_GLOBAL_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR) specifies that a global
alpha value **must** be specified that will be applied to all pixels in the
source image.

* 
[VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR) specifies that the alpha
value will be determined by the alpha component of the source image’s
pixels.
If the source format contains no alpha values, no blending will be
applied.
The source alpha values are not premultiplied into the source image’s
other color components.

* 
[VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_PREMULTIPLIED_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR) is
equivalent to [VK_DISPLAY_PLANE_ALPHA_PER_PIXEL_BIT_KHR](#VkDisplayPlaneAlphaFlagBitsKHR), except the
source alpha values are assumed to be premultiplied into the source
image’s other color components.

// Provided by VK_KHR_display
typedef VkFlags VkDisplayPlaneAlphaFlagsKHR;

`VkDisplayPlaneAlphaFlagsKHR` is a bitmask type for setting a mask of
zero or more [VkDisplayPlaneAlphaFlagBitsKHR](#VkDisplayPlaneAlphaFlagBitsKHR).

The `VkDisplaySurfaceStereoCreateInfoNV` structure is defined as:

// Provided by VK_NV_display_stereo
typedef struct VkDisplaySurfaceStereoCreateInfoNV {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDisplaySurfaceStereoTypeNV    stereoType;
} VkDisplaySurfaceStereoCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `stereoType` is a
[VkDisplaySurfaceStereoTypeNV](#VkDisplaySurfaceStereoTypeNV) value specifying the type of 3D
stereo presentation the display will be configured for.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplaySurfaceStereoCreateInfoNV-sType-sType) VUID-VkDisplaySurfaceStereoCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_SURFACE_STEREO_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDisplaySurfaceStereoCreateInfoNV-stereoType-parameter) VUID-VkDisplaySurfaceStereoCreateInfoNV-stereoType-parameter

 `stereoType` **must** be a valid [VkDisplaySurfaceStereoTypeNV](#VkDisplaySurfaceStereoTypeNV) value

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDisplaySurfaceCreateInfoKHR](#VkDisplaySurfaceCreateInfoKHR)

Possible values of
[VkDisplaySurfaceStereoCreateInfoNV](#VkDisplaySurfaceStereoCreateInfoNV)::`stereoType`, specifying the
type of 3D stereo presentation the display will be configured for, are:

// Provided by VK_NV_display_stereo
typedef enum VkDisplaySurfaceStereoTypeNV {
    VK_DISPLAY_SURFACE_STEREO_TYPE_NONE_NV = 0,
    VK_DISPLAY_SURFACE_STEREO_TYPE_ONBOARD_DIN_NV = 1,
    VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV = 2,
    VK_DISPLAY_SURFACE_STEREO_TYPE_INBAND_DISPLAYPORT_NV = 3,
} VkDisplaySurfaceStereoTypeNV;

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_NONE_NV](#VkDisplaySurfaceStereoTypeNV) specifies no configuration
for stereo presentation.
This is the default behavior if [VkDisplaySurfaceStereoCreateInfoNV](#VkDisplaySurfaceStereoCreateInfoNV)
is not provided.

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_ONBOARD_DIN_NV](#VkDisplaySurfaceStereoTypeNV) specifies
configuration for glasses that connect via a DIN connector on the back
of the graphics card.

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_HDMI_3D_NV](#VkDisplaySurfaceStereoTypeNV) specifies configuration
for HDMI 3D compatible display devices with their own stereo emitters.
This is also known as HDMI Frame Packed Stereo, where the left and right
eye images are stacked into a single frame with a doubled pixel clock
and refresh rate.

* 
[VK_DISPLAY_SURFACE_STEREO_TYPE_INBAND_DISPLAYPORT_NV](#VkDisplaySurfaceStereoTypeNV) specifies
configuration for DisplayPort display devices with in-band stereo
signaling and emitters.

Vulkan rendering can be presented to a headless surface, where the
presentation operation is a no-op producing no externally-visible result.

|  | Because there is no real presentation target, the headless presentation
| --- | --- |
engine may be extended to impose an arbitrary or customizable set of
restrictions and features.
This makes it a useful portable test target for applications targeting a
wide range of presentation engines where the actual target presentation
engines might be scarce, unavailable or otherwise undesirable or
inconvenient to use for general Vulkan application development.

The usual surface query mechanisms must be used to determine the actual
restrictions and features of the implementation. |

To create a headless `VkSurfaceKHR` object, call:

// Provided by VK_EXT_headless_surface
VkResult vkCreateHeadlessSurfaceEXT(
    VkInstance                                  instance,
    const VkHeadlessSurfaceCreateInfoEXT*       pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSurfaceKHR*                               pSurface);

* 
`instance` is the instance to associate the surface with.

* 
`pCreateInfo` is a pointer to a [VkHeadlessSurfaceCreateInfoEXT](#VkHeadlessSurfaceCreateInfoEXT)
structure containing parameters affecting the creation of the surface
object.

* 
`pAllocator` is the allocator used for host memory allocated for the
surface object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSurface` is a pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle in which the
created surface object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateHeadlessSurfaceEXT-instance-parameter) VUID-vkCreateHeadlessSurfaceEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](../initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateHeadlessSurfaceEXT-pCreateInfo-parameter) VUID-vkCreateHeadlessSurfaceEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkHeadlessSurfaceCreateInfoEXT](#VkHeadlessSurfaceCreateInfoEXT) structure

* 
[](#VUID-vkCreateHeadlessSurfaceEXT-pAllocator-parameter) VUID-vkCreateHeadlessSurfaceEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateHeadlessSurfaceEXT-pSurface-parameter) VUID-vkCreateHeadlessSurfaceEXT-pSurface-parameter

 `pSurface` **must** be a valid pointer to a [VkSurfaceKHR](#VkSurfaceKHR) handle

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkHeadlessSurfaceCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_headless_surface
typedef struct VkHeadlessSurfaceCreateInfoEXT {
    VkStructureType                    sType;
    const void*                        pNext;
    VkHeadlessSurfaceCreateFlagsEXT    flags;
} VkHeadlessSurfaceCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

Valid Usage (Implicit)

* 
[](#VUID-VkHeadlessSurfaceCreateInfoEXT-sType-sType) VUID-VkHeadlessSurfaceCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HEADLESS_SURFACE_CREATE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkHeadlessSurfaceCreateInfoEXT-pNext-pNext) VUID-VkHeadlessSurfaceCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkHeadlessSurfaceCreateInfoEXT-flags-zerobitmask) VUID-VkHeadlessSurfaceCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

For headless surfaces, `currentExtent` is the reserved value
(0xFFFFFFFF, 0xFFFFFFFF).
Whatever the application sets a swapchain’s `imageExtent` to will be the
size of the surface, after the first image is presented.

// Provided by VK_EXT_headless_surface
typedef VkFlags VkHeadlessSurfaceCreateFlagsEXT;

`VkHeadlessSurfaceCreateFlagsEXT` is a bitmask type for setting a mask,
but is currently reserved for future use.

Not all physical devices will include WSI support.
Within a physical device, not all queue families will support presentation.
WSI support and compatibility **can** be determined in a platform-neutral
manner (which determines support for presentation to a particular surface
object) and additionally **may** be determined in platform-specific manners
(which determine support for presentation on the specified physical device
but do not guarantee support for presentation to a particular surface
object).

To determine whether a queue family of a physical device supports
presentation to a given surface, call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfaceSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    VkSurfaceKHR                                surface,
    VkBool32*                                   pSupported);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family.

* 
`surface` is the surface.

* 
`pSupported` is a pointer to a `VkBool32`.
[VK_TRUE](../fundamentals.html#VK_TRUE) indicates support, and [VK_FALSE](../fundamentals.html#VK_FALSE) indicates no
support.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-queueFamilyIndex-01269) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-queueFamilyIndex-01269

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-pSupported-parameter) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-pSupported-parameter

 `pSupported` **must** be a valid pointer to a `VkBool32` value

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-commonparent) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-commonparent

 Both of `physicalDevice`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

On Android, all physical devices and queue families **must** be capable of
presentation with any native window.
As a result there is no Android-specific query for these capabilities.

To determine whether a queue family of a physical device supports
presentation to a Wayland compositor, call:

// Provided by VK_KHR_wayland_surface
VkBool32 vkGetPhysicalDeviceWaylandPresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    struct wl_display*                          display);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`display` is a pointer to the `wl_display` associated with a
Wayland compositor.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-queueFamilyIndex-01306) VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-queueFamilyIndex-01306

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-display-parameter) VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-display-parameter

 `display` **must** be a valid pointer to a `wl_display` value

To determine whether a queue family of a physical device supports
presentation to the Microsoft Windows desktop, call:

// Provided by VK_KHR_win32_surface
VkBool32 vkGetPhysicalDeviceWin32PresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-queueFamilyIndex-01309) VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-queueFamilyIndex-01309

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

To determine whether a queue family of a physical device supports
presentation to an X11 server, using the XCB client-side library, call:

// Provided by VK_KHR_xcb_surface
VkBool32 vkGetPhysicalDeviceXcbPresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    xcb_connection_t*                           connection,
    xcb_visualid_t                              visual_id);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`connection` is a pointer to an `xcb_connection_t` to the X
server.

* 
`visual_id` is an X11 visual (`xcb_visualid_t`).

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-queueFamilyIndex-01312) VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-queueFamilyIndex-01312

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-connection-parameter) VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-connection-parameter

 `connection` **must** be a valid pointer to an `xcb_connection_t` value

To determine whether a queue family of a physical device supports
presentation to an X11 server, using the Xlib client-side library, call:

// Provided by VK_KHR_xlib_surface
VkBool32 vkGetPhysicalDeviceXlibPresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    Display*                                    dpy,
    VisualID                                    visualID);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`dpy` is a pointer to an Xlib `Display` connection to the server.

* 
`visualID` is an X11 visual (`VisualID`).

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-queueFamilyIndex-01315) VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-queueFamilyIndex-01315

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-dpy-parameter) VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-dpy-parameter

 `dpy` **must** be a valid pointer to a `Display` value

To determine whether a queue family of a physical device supports
presentation with DirectFB library, call:

// Provided by VK_EXT_directfb_surface
VkBool32 vkGetPhysicalDeviceDirectFBPresentationSupportEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    IDirectFB*                                  dfb);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`dfb` is a pointer to the `IDirectFB` main interface of DirectFB.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-queueFamilyIndex-04119) VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-queueFamilyIndex-04119

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-dfb-parameter) VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-dfb-parameter

 `dfb` **must** be a valid pointer to an `IDirectFB` value

On Apple platforms with Metal support, all physical devices and queue
families **must** be capable of presentation with any layer.
As a result there is no Apple-specific query for these capabilities.

On Fuchsia, all physical devices and queue families **must** be capable of
presentation with any ImagePipe.
As a result there is no Fuchsia-specific query for these capabilities.

On Google Games Platform, all physical devices and queue families with the
[VK_QUEUE_GRAPHICS_BIT](../devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](../devsandqueues.html#VkQueueFlagBits) capabilities **must**
be capable of presentation with any Google Games Platform stream descriptor.
As a result, there is no query specific to Google Games Platform for these
capabilities.

On iOS, all physical devices and queue families **must** be capable of
presentation with any layer.
As a result there is no iOS-specific query for these capabilities.

On macOS, all physical devices and queue families **must** be capable of
presentation with any layer.
As a result there is no macOS-specific query for these capabilities.

On VI, all physical devices and queue families **must** be capable of
presentation with any layer.
As a result there is no VI-specific query for these capabilities.

To determine whether a queue family of a physical device supports
presentation to a QNX Screen compositor, call:

// Provided by VK_QNX_screen_surface
VkBool32 vkGetPhysicalDeviceScreenPresentationSupportQNX(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    struct _screen_window*                      window);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`window` is the QNX Screen `window` object.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-queueFamilyIndex-04743) VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-queueFamilyIndex-04743

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-physicalDevice-parameter) VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-window-parameter) VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-window-parameter

 `window` **must** be a valid pointer to a `_screen_window` value

On Open Harmony OS, all physical devices and queue families **must** be capable
of presentation with any native window.
As a result there is no Open Harmony OS platform-specific query for these
capabilities.

To determine whether a queue family of a physical device supports
presentation to a UBM compositor, call:

// Provided by VK_SEC_ubm_surface
VkBool32 vkGetPhysicalDeviceUbmPresentationSupportSEC(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    struct ubm_device*                          device);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`device` is a pointer to the `ubm_device` associated with a UBM
compositor.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-12368) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-12368

`device` **must** point to a valid UBM `ubm_device`

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-queueFamilyIndex-12369) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-queueFamilyIndex-12369

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-physicalDevice-parameter) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-parameter) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-parameter

 `device` **must** be a valid pointer to a `ubm_device` value

The capabilities of a swapchain targeting a surface are the intersection of
the capabilities of the WSI platform, the native window or display, and the
physical device.
The resulting capabilities **can** be obtained with the queries listed below in
this section.

|  | In addition to the surface capabilities as obtained by surface queries
| --- | --- |
below, swapchain images are also subject to ordinary image creation limits
as reported by [vkGetPhysicalDeviceImageFormatProperties](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties).
As an application is instructed by the appropriate Valid Usage sections,
both the surface capabilities and the image creation limits have to be
satisfied whenever swapchain images are created. |

To query the basic capabilities of a surface, needed in order to create a
swapchain, call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfaceCapabilitiesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    VkSurfaceCapabilitiesKHR*                   pSurfaceCapabilities);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pSurfaceCapabilities` is a pointer to a
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR) structure in which the capabilities are
returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-06211) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-06211

`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-pSurfaceCapabilities-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-pSurfaceCapabilities-parameter

 `pSurfaceCapabilities` **must** be a valid pointer to a [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-commonparent) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-commonparent

 Both of `physicalDevice`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSurfaceCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_surface
typedef struct VkSurfaceCapabilitiesKHR {
    uint32_t                         minImageCount;
    uint32_t                         maxImageCount;
    VkExtent2D                       currentExtent;
    VkExtent2D                       minImageExtent;
    VkExtent2D                       maxImageExtent;
    uint32_t                         maxImageArrayLayers;
    VkSurfaceTransformFlagsKHR       supportedTransforms;
    VkSurfaceTransformFlagBitsKHR    currentTransform;
    VkCompositeAlphaFlagsKHR         supportedCompositeAlpha;
    VkImageUsageFlags                supportedUsageFlags;
} VkSurfaceCapabilitiesKHR;

* 
`minImageCount` is the minimum number of images the specified device
supports for a swapchain created for the surface, and will be at least
one.

* 
`maxImageCount` is the maximum number of images the specified device
supports for a swapchain created for the surface, and will be either 0,
or greater than or equal to `minImageCount`.
A value of 0 means that there is no limit on the number of images,
though there **may** be limits related to the total amount of memory used
by presentable images.

* 
`currentExtent` is the current width and height of the surface, or
the special value (0xFFFFFFFF, 0xFFFFFFFF) indicating that the
surface size will be determined by the extent of a swapchain targeting
the surface.

* 
`minImageExtent` contains the smallest valid swapchain extent for
the surface on the specified device.
The `width` and `height` of the extent will each be less than or
equal to the corresponding `width` and `height` of
`currentExtent`, unless `currentExtent` has the special value
described above.

* 
`maxImageExtent` contains the largest valid swapchain extent for the
surface on the specified device.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
`minImageExtent`.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
`currentExtent`, unless `currentExtent` has the special value
described above.

* 
`maxImageArrayLayers` is the maximum number of layers presentable
images **can** have for a swapchain created for this device and surface,
and will be at least one.

* 
`supportedTransforms` is a bitmask of
[VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) indicating the presentation
transforms supported for the surface on the specified device.
At least one bit will be set.

* 
`currentTransform` is [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) value
indicating the surface’s current transform relative to the presentation
engine’s natural orientation.

* 
`supportedCompositeAlpha` is a bitmask of
[VkCompositeAlphaFlagBitsKHR](#VkCompositeAlphaFlagBitsKHR), representing the alpha compositing
modes supported by the presentation engine for the surface on the
specified device, and at least one bit will be set.
Opaque composition **can** be achieved in any alpha compositing mode by
either using an image format that has no alpha component, or by ensuring
that all pixels in the presentable images have an alpha value of 1.0.

* 
`supportedUsageFlags` is a bitmask of [VkImageUsageFlagBits](../resources.html#VkImageUsageFlagBits)
representing the ways the application **can** use the presentable images of
a swapchain created
with [VkPresentModeKHR](#VkPresentModeKHR) set to
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR), [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR)
for the surface on the specified device.
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](../resources.html#VkImageUsageFlagBits) **must** be included in the set.
Implementations **may** support additional usages.

|  | Supported usage flags of a presentable image when using
| --- | --- |
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR) presentation mode are
provided by
[VkSharedPresentSurfaceCapabilitiesKHR](#VkSharedPresentSurfaceCapabilitiesKHR)::`sharedPresentSupportedUsageFlags`. |

|  | Formulas such as min(N, `maxImageCount`) are not correct, since
| --- | --- |
`maxImageCount` **may** be zero. |

To query the basic capabilities of a surface defined by the core or
extensions, call:

// Provided by VK_KHR_get_surface_capabilities2
VkResult vkGetPhysicalDeviceSurfaceCapabilities2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    VkSurfaceCapabilities2KHR*                  pSurfaceCapabilities);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pSurfaceInfo` is a pointer to a
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure describing the surface
and other fixed parameters that would be consumed by
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pSurfaceCapabilities` is a pointer to a
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR) structure in which the capabilities are
returned.

`vkGetPhysicalDeviceSurfaceCapabilities2KHR` behaves similarly to
[vkGetPhysicalDeviceSurfaceCapabilitiesKHR](#vkGetPhysicalDeviceSurfaceCapabilitiesKHR), with the ability to specify
extended inputs via chained input structures, and to return extended
information via chained output structures.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06521) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06521

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is not enabled,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06522) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06522

If `pSurfaceInfo->surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`pSurfaceInfo->surface` **must** be supported by `physicalDevice`,
as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an
equivalent platform-specific mechanism

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-02671) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-02671

If a [VkSurfaceCapabilitiesFullScreenExclusiveEXT](#VkSurfaceCapabilitiesFullScreenExclusiveEXT) structure is
included in the `pNext` chain of `pSurfaceCapabilities`, a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](#VkSurfaceFullScreenExclusiveWin32InfoEXT) structure **must** be
included in the `pNext` chain of `pSurfaceInfo`

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07776) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07776

If a [VkSurfacePresentModeCompatibilityKHR](#VkSurfacePresentModeCompatibilityKHR) structure is included in
the `pNext` chain of `pSurfaceCapabilities`, a
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) structure **must** be included in the
`pNext` chain of `pSurfaceInfo`

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07777) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07777

If a [VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR) structure is included
in the `pNext` chain of `pSurfaceCapabilities`, a
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) structure **must** be included in the
`pNext` chain of `pSurfaceInfo`

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07778) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07778

If a [VkSurfacePresentModeCompatibilityKHR](#VkSurfacePresentModeCompatibilityKHR) structure is included in
the `pNext` chain of `pSurfaceCapabilities`,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07779) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07779

If a [VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR) structure is included
in the `pNext` chain of `pSurfaceCapabilities`,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceCapabilities-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceCapabilities-parameter

 `pSurfaceCapabilities` **must** be a valid pointer to a [VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR) structure

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkPhysicalDeviceSurfaceInfo2KHR` structure is defined as:

// Provided by VK_KHR_get_surface_capabilities2
typedef struct VkPhysicalDeviceSurfaceInfo2KHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSurfaceKHR       surface;
} VkPhysicalDeviceSurfaceInfo2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surface` is the surface that will be associated with the swapchain.

The members of `VkPhysicalDeviceSurfaceInfo2KHR` correspond to the
arguments to [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](#vkGetPhysicalDeviceSurfaceCapabilitiesKHR), with
`sType` and `pNext` added for extensibility.

Additional capabilities of a surface **may** be available to swapchains created
with different full-screen exclusive settings - particularly if exclusive
full-screen access is application controlled.
These additional capabilities **can** be queried by adding a
[VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT) structure to the `pNext` chain
of this structure when used to query surface properties.
Additionally, for Win32 surfaces with application controlled exclusive
full-screen access, chaining a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](#VkSurfaceFullScreenExclusiveWin32InfoEXT) structure **may** also report
additional surface capabilities.
These additional capabilities only apply to swapchains created with the same
parameters included in the `pNext` chain of
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-02672) VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-02672

If the `pNext` chain includes a
[VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT) structure with its
`fullScreenExclusive` member set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT), and
`surface` was created using [vkCreateWin32SurfaceKHR](#vkCreateWin32SurfaceKHR), a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](#VkSurfaceFullScreenExclusiveWin32InfoEXT) structure **must** be
included in the `pNext` chain

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-surface-07919) VUID-VkPhysicalDeviceSurfaceInfo2KHR-surface-07919

If surface is not VK_NULL_HANDLE,
and the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is not enabled,
`surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-sType) VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SURFACE_INFO_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-pNext) VUID-VkPhysicalDeviceSurfaceInfo2KHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT), [VkSurfaceFullScreenExclusiveWin32InfoEXT](#VkSurfaceFullScreenExclusiveWin32InfoEXT), or [VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-unique) VUID-VkPhysicalDeviceSurfaceInfo2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) includes a
`VkSurfaceFullScreenExclusiveInfoEXT` structure, then that structure
specifies the application’s preferred full-screen transition behavior.

The `VkSurfaceFullScreenExclusiveInfoEXT` structure is defined as:

// Provided by VK_EXT_full_screen_exclusive
typedef struct VkSurfaceFullScreenExclusiveInfoEXT {
    VkStructureType             sType;
    void*                       pNext;
    VkFullScreenExclusiveEXT    fullScreenExclusive;
} VkSurfaceFullScreenExclusiveInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fullScreenExclusive` is a [VkFullScreenExclusiveEXT](#VkFullScreenExclusiveEXT) value
specifying the preferred full-screen transition behavior.

If this structure is not present, `fullScreenExclusive` is considered to
be [VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT](#VkFullScreenExclusiveEXT).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceFullScreenExclusiveInfoEXT-sType-sType) VUID-VkSurfaceFullScreenExclusiveInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfaceFullScreenExclusiveInfoEXT-fullScreenExclusive-parameter) VUID-VkSurfaceFullScreenExclusiveInfoEXT-fullScreenExclusive-parameter

 `fullScreenExclusive` **must** be a valid [VkFullScreenExclusiveEXT](#VkFullScreenExclusiveEXT) value

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

Possible values of
`VkSurfaceFullScreenExclusiveInfoEXT`::`fullScreenExclusive` are:

// Provided by VK_EXT_full_screen_exclusive
typedef enum VkFullScreenExclusiveEXT {
    VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT = 0,
    VK_FULL_SCREEN_EXCLUSIVE_ALLOWED_EXT = 1,
    VK_FULL_SCREEN_EXCLUSIVE_DISALLOWED_EXT = 2,
    VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT = 3,
} VkFullScreenExclusiveEXT;

* 
[VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT](#VkFullScreenExclusiveEXT) specifies that the
implementation **should** determine the appropriate full-screen method by
whatever means it deems appropriate.

* 
[VK_FULL_SCREEN_EXCLUSIVE_ALLOWED_EXT](#VkFullScreenExclusiveEXT) specifies that the
implementation **may** use full-screen exclusive mechanisms when available.
Such mechanisms **may** result in better performance and/or the
availability of different presentation capabilities, but **may** require a
more disruptive transition during swapchain initialization, first
presentation and/or destruction.

* 
[VK_FULL_SCREEN_EXCLUSIVE_DISALLOWED_EXT](#VkFullScreenExclusiveEXT) specifies that the
implementation **should** avoid using full-screen mechanisms which rely on
disruptive transitions.

* 
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT) specifies that
the application will manage full-screen exclusive mode by using the
[vkAcquireFullScreenExclusiveModeEXT](#vkAcquireFullScreenExclusiveModeEXT) and
[vkReleaseFullScreenExclusiveModeEXT](#vkReleaseFullScreenExclusiveModeEXT) commands.

The `VkSurfaceFullScreenExclusiveWin32InfoEXT` structure is defined as:

// Provided by VK_KHR_win32_surface with VK_EXT_full_screen_exclusive
typedef struct VkSurfaceFullScreenExclusiveWin32InfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    HMONITOR           hmonitor;
} VkSurfaceFullScreenExclusiveWin32InfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hmonitor` is the Win32 `HMONITOR` handle identifying the display
to create the surface with.

|  | If `hmonitor` is invalidated (e.g. the monitor is unplugged) during the
| --- | --- |
lifetime of a swapchain created with this structure, operations on that
swapchain will return [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult). |

|  | It is the responsibility of the application to change the display settings
| --- | --- |
of the targeted Win32 display using the appropriate platform APIs.
Such changes **may** alter the surface capabilities reported for the created
surface. |

Valid Usage

* 
[](#VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-hmonitor-02673) VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-hmonitor-02673

`hmonitor` **must** be a valid `HMONITOR`

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-sType-sType) VUID-VkSurfaceFullScreenExclusiveWin32InfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_WIN32_INFO_EXT](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

The `VkSurfaceCapabilities2KHR` structure is defined as:

// Provided by VK_KHR_get_surface_capabilities2
typedef struct VkSurfaceCapabilities2KHR {
    VkStructureType             sType;
    void*                       pNext;
    VkSurfaceCapabilitiesKHR    surfaceCapabilities;
} VkSurfaceCapabilities2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surfaceCapabilities` is a [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR) structure
describing the capabilities of the specified surface.

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is enabled and
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface` in the
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR) call is
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the values returned in `minImageCount`,
`maxImageCount`, `currentExtent`, and `currentTransform` will
not reflect that of any surface and will instead be as such:

* 
`minImageCount` and `maxImageCount` will be 0xFFFFFFFF

* 
`currentExtent` will be (0xFFFFFFFF, 0xFFFFFFFF)

* 
`currentTransform` will be
[VK_SURFACE_TRANSFORM_INHERIT_BIT_KHR](#VkSurfaceTransformFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilities2KHR-sType-sType) VUID-VkSurfaceCapabilities2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfaceCapabilities2KHR-pNext-pNext) VUID-VkSurfaceCapabilities2KHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDisplayNativeHdrSurfaceCapabilitiesAMD](#VkDisplayNativeHdrSurfaceCapabilitiesAMD), [VkLatencySurfaceCapabilitiesNV](#VkLatencySurfaceCapabilitiesNV), [VkPresentTimingSurfaceCapabilitiesEXT](#VkPresentTimingSurfaceCapabilitiesEXT), [VkSharedPresentSurfaceCapabilitiesKHR](#VkSharedPresentSurfaceCapabilitiesKHR), [VkSurfaceCapabilitiesFullScreenExclusiveEXT](#VkSurfaceCapabilitiesFullScreenExclusiveEXT), [VkSurfaceCapabilitiesPresentBarrierNV](#VkSurfaceCapabilitiesPresentBarrierNV), [VkSurfaceCapabilitiesPresentId2KHR](#VkSurfaceCapabilitiesPresentId2KHR), [VkSurfaceCapabilitiesPresentWait2KHR](#VkSurfaceCapabilitiesPresentWait2KHR), [VkSurfacePresentModeCompatibilityKHR](#VkSurfacePresentModeCompatibilityKHR), [VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR), or [VkSurfaceProtectedCapabilitiesKHR](#VkSurfaceProtectedCapabilitiesKHR)

* 
[](#VUID-VkSurfaceCapabilities2KHR-sType-unique) VUID-VkSurfaceCapabilities2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

An application queries if a protected [VkSurfaceKHR](#VkSurfaceKHR) is displayable on a
specific windowing system using `VkSurfaceProtectedCapabilitiesKHR`,
which **can** be passed in `pNext` parameter of
`VkSurfaceCapabilities2KHR`.

The `VkSurfaceProtectedCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_surface_protected_capabilities
typedef struct VkSurfaceProtectedCapabilitiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           supportsProtected;
} VkSurfaceProtectedCapabilitiesKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportsProtected` specifies whether a protected swapchain created
from [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface` for a
particular windowing system **can** be displayed on screen or not.
If `supportsProtected` is [VK_TRUE](../fundamentals.html#VK_TRUE), then creation of swapchains
with the [VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) flag set **must** be
supported for `surface`.

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is enabled, the value
returned in `supportsProtected` will be identical for every valid
surface created on this physical device, and so in the
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR) call,
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface` **can** be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE).
In that case, the contents of
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)::`surfaceCapabilities` as well as any
other structure chained to it will be **undefined**.

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceProtectedCapabilitiesKHR-sType-sType) VUID-VkSurfaceProtectedCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PROTECTED_CAPABILITIES_KHR](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkSurfacePresentScalingCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_surface_maintenance1
typedef struct VkSurfacePresentScalingCapabilitiesKHR {
    VkStructureType             sType;
    void*                       pNext;
    VkPresentScalingFlagsKHR    supportedPresentScaling;
    VkPresentGravityFlagsKHR    supportedPresentGravityX;
    VkPresentGravityFlagsKHR    supportedPresentGravityY;
    VkExtent2D                  minScaledImageExtent;
    VkExtent2D                  maxScaledImageExtent;
} VkSurfacePresentScalingCapabilitiesKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkSurfacePresentScalingCapabilitiesKHR
typedef VkSurfacePresentScalingCapabilitiesKHR VkSurfacePresentScalingCapabilitiesEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportedPresentScaling` is a bitmask of
[VkPresentScalingFlagBitsKHR](#VkPresentScalingFlagBitsKHR) representing the scaling methods
supported by the surface, or `0` if application-defined scaling is not
supported.

* 
`supportedPresentGravityX` is a bitmask of
[VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR) representing the X-axis pixel gravity
supported by the surface, or `0` if Vulkan-defined pixel gravity is not
supported for the X axis.

* 
`supportedPresentGravityY` is a bitmask of
[VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR) representing the Y-axis pixel gravity
supported by the surface, or `0` if Vulkan-defined pixel gravity is not
supported for the Y axis.

* 
`minScaledImageExtent` contains the smallest valid swapchain extent
for the surface on the specified device when one of the scaling methods
specified in `supportedPresentScaling` is used, or the special value
(0xFFFFFFFF, 0xFFFFFFFF) indicating that the surface size will be
determined by the extent of a swapchain targeting the surface.
The `width` and `height` of the extent will each be smaller than
or equal to the corresponding `width` and `height` of
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`minImageExtent`.

* 
`maxScaledImageExtent` contains the largest valid swapchain extent
for the surface on the specified device when one of the scaling methods
specified in `supportedPresentScaling` is used, or the special value
described above for `minScaledImageExtent`.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`maxImageExtent`.

To query the set of supported scaling modes for a given present mode, add a
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) structure in the `pNext` chain of
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) when calling
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR).
The implementation **must** return the same values in
`VkSurfacePresentScalingCapabilitiesKHR` for any of the compatible
present modes as obtained through
[VkSurfacePresentModeCompatibilityKHR](#VkSurfacePresentModeCompatibilityKHR).

The application **can** specify the scaling mode when creating a swapchain
through the use of [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-sType-sType) VUID-VkSurfacePresentScalingCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentScaling-parameter) VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentScaling-parameter

 `supportedPresentScaling` **must** be a valid combination of [VkPresentScalingFlagBitsKHR](#VkPresentScalingFlagBitsKHR) values

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityX-parameter) VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityX-parameter

 `supportedPresentGravityX` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR) values

* 
[](#VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityY-parameter) VUID-VkSurfacePresentScalingCapabilitiesKHR-supportedPresentGravityY-parameter

 `supportedPresentGravityY` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR) values

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

Bits which **may** be set in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentScaling`,
specifying scaling modes supported by the surface, are:

// Provided by VK_KHR_surface_maintenance1
typedef enum VkPresentScalingFlagBitsKHR {
    VK_PRESENT_SCALING_ONE_TO_ONE_BIT_KHR = 0x00000001,
    VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_KHR = 0x00000002,
    VK_PRESENT_SCALING_STRETCH_BIT_KHR = 0x00000004,
    VK_PRESENT_SCALING_ONE_TO_ONE_BIT_EXT = VK_PRESENT_SCALING_ONE_TO_ONE_BIT_KHR,
    VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_EXT = VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_KHR,
    VK_PRESENT_SCALING_STRETCH_BIT_EXT = VK_PRESENT_SCALING_STRETCH_BIT_KHR,
} VkPresentScalingFlagBitsKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkPresentScalingFlagBitsKHR
typedef VkPresentScalingFlagBitsKHR VkPresentScalingFlagBitsEXT;

* 
[VK_PRESENT_SCALING_ONE_TO_ONE_BIT_KHR](#VkPresentScalingFlagBitsEXT) specifies that no scaling
occurs, and pixels in the swapchain image are mapped to one and only one
pixel in the surface.
The mapping between pixels is defined by the chosen presentation
gravity.

* 
[VK_PRESENT_SCALING_ASPECT_RATIO_STRETCH_BIT_KHR](#VkPresentScalingFlagBitsEXT) specifies that the
swapchain image will be minified or magnified such that at least one of
the resulting width or height is equal to the corresponding surface
dimension, and the other resulting dimension is less than or equal to
the corresponding surface dimension, with the aspect ratio of the
resulting image being identical to that of the original swapchain image.

* 
[VK_PRESENT_SCALING_STRETCH_BIT_KHR](#VkPresentScalingFlagBitsEXT) specifies that the swapchain
image will be minified or magnified such that the resulting image
dimensions are equal to those of the surface.

// Provided by VK_KHR_surface_maintenance1
typedef VkFlags VkPresentScalingFlagsKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkPresentScalingFlagsKHR
typedef VkPresentScalingFlagsKHR VkPresentScalingFlagsEXT;

`VkPresentScalingFlagsKHR` is a bitmask type for setting a mask of zero
or more [VkPresentScalingFlagBitsKHR](#VkPresentScalingFlagBitsKHR).

Bits which **may** be set in the
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentGravityX`
or `supportedPresentGravityY` fields, specifying the gravity of
presented pixels supported by the surface, are:

// Provided by VK_KHR_surface_maintenance1
typedef enum VkPresentGravityFlagBitsKHR {
    VK_PRESENT_GRAVITY_MIN_BIT_KHR = 0x00000001,
    VK_PRESENT_GRAVITY_MAX_BIT_KHR = 0x00000002,
    VK_PRESENT_GRAVITY_CENTERED_BIT_KHR = 0x00000004,
    VK_PRESENT_GRAVITY_MIN_BIT_EXT = VK_PRESENT_GRAVITY_MIN_BIT_KHR,
    VK_PRESENT_GRAVITY_MAX_BIT_EXT = VK_PRESENT_GRAVITY_MAX_BIT_KHR,
    VK_PRESENT_GRAVITY_CENTERED_BIT_EXT = VK_PRESENT_GRAVITY_CENTERED_BIT_KHR,
} VkPresentGravityFlagBitsKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkPresentGravityFlagBitsKHR
typedef VkPresentGravityFlagBitsKHR VkPresentGravityFlagBitsEXT;

* 
[VK_PRESENT_GRAVITY_MIN_BIT_KHR](#VkPresentGravityFlagBitsEXT) means that the pixels will
gravitate towards the top or left side of the surface.

* 
[VK_PRESENT_GRAVITY_MAX_BIT_KHR](#VkPresentGravityFlagBitsEXT) means that the pixels will
gravitate towards the bottom or right side of the surface.

* 
[VK_PRESENT_GRAVITY_CENTERED_BIT_KHR](#VkPresentGravityFlagBitsEXT) means that the pixels will be
centered in the surface.

If the value in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`currentTransform` is
not [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](#VkSurfaceTransformFlagBitsKHR), it is
implementation-defined whether the gravity configuration applies to the
presented image before or after transformation.

// Provided by VK_KHR_surface_maintenance1
typedef VkFlags VkPresentGravityFlagsKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkPresentGravityFlagsKHR
typedef VkPresentGravityFlagsKHR VkPresentGravityFlagsEXT;

`VkPresentGravityFlagsKHR` is a bitmask type for setting a mask of zero
or more [VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR).

The `VkSurfacePresentModeKHR` structure is defined as:

// Provided by VK_KHR_surface_maintenance1
typedef struct VkSurfacePresentModeKHR {
    VkStructureType     sType;
    void*               pNext;
    VkPresentModeKHR    presentMode;
} VkSurfacePresentModeKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkSurfacePresentModeKHR
typedef VkSurfacePresentModeKHR VkSurfacePresentModeEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentMode` is the presentation mode the swapchain will use.

If the `VkSurfacePresentModeKHR` structure is included in the
`pNext` chain of [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR), the values
returned in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`minImageCount`,
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`maxImageCount`,
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`minScaledImageExtent`,
and [VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`maxScaledImageExtent`
are valid only for the specified `presentMode`.
If `presentMode` is [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR), the per-present mode
image counts **must** both be one.
The per-present mode image counts **may** be less-than or greater-than the
image counts returned when `VkSurfacePresentModeKHR` is not provided.

|  | If [VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR) is provided to swapchain
| --- | --- |
creation, the requirements for forward progress may be less strict.
For example, a FIFO swapchain might only require 2 images to guarantee
forward progress, but a MAILBOX one might require 4.
Without the per-present image counts, such an implementation would have to
return 4 in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`minImageCount`, which
pessimizes FIFO.
Conversely, an implementation may return a low number for minImageCount, but
internally bump the image count when application queries
[vkGetSwapchainImagesKHR](#vkGetSwapchainImagesKHR), which can surprise applications, and is not
discoverable until swapchain creation.
Using `VkSurfacePresentModeKHR` and
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR) together effectively removes this
problem.

[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR) is required for the specification
to be backwards compatible with applications that do not know about, or make
use of this feature. |

Valid Usage

* 
[](#VUID-VkSurfacePresentModeKHR-presentMode-07780) VUID-VkSurfacePresentModeKHR-presentMode-07780

`presentMode` **must** be a value reported by
[vkGetPhysicalDeviceSurfacePresentModesKHR](#vkGetPhysicalDeviceSurfacePresentModesKHR) for the specified
surface

Valid Usage (Implicit)

* 
[](#VUID-VkSurfacePresentModeKHR-sType-sType) VUID-VkSurfacePresentModeKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfacePresentModeKHR-presentMode-parameter) VUID-VkSurfacePresentModeKHR-presentMode-parameter

 `presentMode` **must** be a valid [VkPresentModeKHR](#VkPresentModeKHR) value

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)

The `VkSurfacePresentModeCompatibilityKHR` structure is defined as:

// Provided by VK_KHR_surface_maintenance1
typedef struct VkSurfacePresentModeCompatibilityKHR {
    VkStructureType      sType;
    void*                pNext;
    uint32_t             presentModeCount;
    VkPresentModeKHR*    pPresentModes;
} VkSurfacePresentModeCompatibilityKHR;

// Provided by VK_EXT_surface_maintenance1
// Equivalent to VkSurfacePresentModeCompatibilityKHR
typedef VkSurfacePresentModeCompatibilityKHR VkSurfacePresentModeCompatibilityEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentModeCount` is an integer related to the number of present
modes available or queried, as described below.

* 
`pPresentModes` is a pointer to an array of [VkPresentModeKHR](#VkPresentModeKHR)
in which present modes compatible with a given present mode are
returned.

If `pPresentModes` is `NULL`, then the number of present modes that are
compatible with the one specified in [VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) is
returned in `presentModeCount`.
Otherwise, `presentModeCount` **must** be set by the application to the
number of elements in the `pPresentModes` array, and on return is
overwritten with the number of values actually written to
`pPresentModes`.
If the value of `presentModeCount` is less than the number of compatible
present modes that are supported, at most `presentModeCount` values will
be written to `pPresentModes`.
The implementation **must** include the present mode passed to
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) in `pPresentModes`, unless
`presentModeCount` is zero.

To query the set of present modes compatible with a given initial present
mode, add a [VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) structure in the `pNext` chain
of [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) when calling
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR).

The application **can** create a swapchain whose present mode **can** be modified
through the use of [VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfacePresentModeCompatibilityKHR-sType-sType) VUID-VkSurfacePresentModeCompatibilityKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfacePresentModeCompatibilityKHR-pPresentModes-parameter) VUID-VkSurfacePresentModeCompatibilityKHR-pPresentModes-parameter

 If `presentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `presentModeCount` [VkPresentModeKHR](#VkPresentModeKHR) values

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkSharedPresentSurfaceCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_shared_presentable_image
typedef struct VkSharedPresentSurfaceCapabilitiesKHR {
    VkStructureType      sType;
    void*                pNext;
    VkImageUsageFlags    sharedPresentSupportedUsageFlags;
} VkSharedPresentSurfaceCapabilitiesKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sharedPresentSupportedUsageFlags` is a bitmask of
[VkImageUsageFlagBits](../resources.html#VkImageUsageFlagBits) representing the ways the application **can**
use the shared presentable image from a swapchain created with
[VkPresentModeKHR](#VkPresentModeKHR) set to
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR) for the surface on
the specified device.
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](../resources.html#VkImageUsageFlagBits) **must** be included in the set
but implementations **may** support additional usages.

Valid Usage (Implicit)

* 
[](#VUID-VkSharedPresentSurfaceCapabilitiesKHR-sType-sType) VUID-VkSharedPresentSurfaceCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHARED_PRESENT_SURFACE_CAPABILITIES_KHR](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkDisplayNativeHdrSurfaceCapabilitiesAMD` structure is defined as:

// Provided by VK_AMD_display_native_hdr
typedef struct VkDisplayNativeHdrSurfaceCapabilitiesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           localDimmingSupport;
} VkDisplayNativeHdrSurfaceCapabilitiesAMD;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`localDimmingSupport` specifies whether the surface supports local
dimming.
If this is [VK_TRUE](../fundamentals.html#VK_TRUE), [VkSwapchainDisplayNativeHdrCreateInfoAMD](#VkSwapchainDisplayNativeHdrCreateInfoAMD)
**can** be used to explicitly enable or disable local dimming for the
surface.
Local dimming may also be overridden by [vkSetLocalDimmingAMD](#vkSetLocalDimmingAMD)
during the lifetime of the swapchain.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayNativeHdrSurfaceCapabilitiesAMD-sType-sType) VUID-VkDisplayNativeHdrSurfaceCapabilitiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_NATIVE_HDR_SURFACE_CAPABILITIES_AMD](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkSurfaceCapabilitiesFullScreenExclusiveEXT` structure is defined
as:

// Provided by VK_EXT_full_screen_exclusive
typedef struct VkSurfaceCapabilitiesFullScreenExclusiveEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fullScreenExclusiveSupported;
} VkSurfaceCapabilitiesFullScreenExclusiveEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fullScreenExclusiveSupported` is a boolean describing whether the
surface is able to make use of exclusive full-screen access.

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR) to determine support for exclusive
full-screen access.
If `fullScreenExclusiveSupported` is [VK_FALSE](../fundamentals.html#VK_FALSE), it indicates that
exclusive full-screen access is not obtainable for this surface.

Applications **must** not attempt to create swapchains with
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT) set if
`fullScreenExclusiveSupported` is [VK_FALSE](../fundamentals.html#VK_FALSE).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesFullScreenExclusiveEXT-sType-sType) VUID-VkSurfaceCapabilitiesFullScreenExclusiveEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_FULL_SCREEN_EXCLUSIVE_EXT](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkSurfaceCapabilitiesPresentBarrierNV` structure is defined as:

// Provided by VK_NV_present_barrier
typedef struct VkSurfaceCapabilitiesPresentBarrierNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentBarrierSupported;
} VkSurfaceCapabilitiesPresentBarrierNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentBarrierSupported` is a boolean describing whether the
surface is able to make use of the present barrier feature.

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR) to determine support for present barrier
access.
If `presentBarrierSupported` is [VK_FALSE](../fundamentals.html#VK_FALSE), it indicates that the
present barrier feature is not obtainable for this surface.

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesPresentBarrierNV-sType-sType) VUID-VkSurfaceCapabilitiesPresentBarrierNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_BARRIER_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkSurfaceCapabilitiesPresentId2KHR` structure is defined as:

// Provided by VK_KHR_present_id2
typedef struct VkSurfaceCapabilitiesPresentId2KHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentId2Supported;
} VkSurfaceCapabilitiesPresentId2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentId2Supported` is a boolean describing whether the surface is
able to support the present-ID extension

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR) to determine support for present-wait.
If `presentId2Supported` is [VK_FALSE](../fundamentals.html#VK_FALSE), it indicates that attaching
an ID to presentation requests is not possible for this surface.

Applications **must** not attempt to include [VkPresentId2KHR](#VkPresentId2KHR) in the
`pNext` chain of a [VkPresentInfoKHR](#VkPresentInfoKHR) if `presentId2Supported`
is [VK_FALSE](../fundamentals.html#VK_FALSE).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesPresentId2KHR-sType-sType) VUID-VkSurfaceCapabilitiesPresentId2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_ID_2_KHR](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkSurfaceCapabilitiesPresentWait2KHR` structure is defined as:

// Provided by VK_KHR_present_wait2
typedef struct VkSurfaceCapabilitiesPresentWait2KHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentWait2Supported;
} VkSurfaceCapabilitiesPresentWait2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentWait2Supported` is a boolean describing whether the surface
is able to support the present-wait extension

This structure **can** be included in the `pNext` chain of
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR) to determine support for present-wait.
If `presentWait2Supported` is [VK_FALSE](../fundamentals.html#VK_FALSE), it indicates that waiting
for presentation is not possible for this surface.

Applications **must** not attempt to call [vkWaitForPresent2KHR](#vkWaitForPresent2KHR) on a
swapchain if `presentWait2Supported` is [VK_FALSE](../fundamentals.html#VK_FALSE).

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilitiesPresentWait2KHR-sType-sType) VUID-VkSurfaceCapabilitiesPresentWait2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_WAIT_2_KHR](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `VkPresentTimingSurfaceCapabilitiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentTimingSurfaceCapabilitiesEXT {
    VkStructureType           sType;
    void*                     pNext;
    VkBool32                  presentTimingSupported;
    VkBool32                  presentAtAbsoluteTimeSupported;
    VkBool32                  presentAtRelativeTimeSupported;
    VkPresentStageFlagsEXT    presentStageQueries;
} VkPresentTimingSurfaceCapabilitiesEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentTimingSupported` indicates whether querying presentation
timestamps is supported for a swapchain created from
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface`.

* 
`presentAtAbsoluteTimeSupported` indicates whether a swapchain
created from [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface`
supports presenting images with absolute times.

* 
`presentAtRelativeTimeSupported` indicates whether a swapchain
created from [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface`
supports presenting images with relative times.

* 
`presentStageQueries` is a bitmask of
[VkPresentStageFlagBitsEXT](#VkPresentStageFlagBitsEXT) indicating which present stages a
swapchain created from
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR)::`surface` is able to provide
timing information for.

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimingSurfaceCapabilitiesEXT-sType-sType) VUID-VkPresentTimingSurfaceCapabilitiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMING_SURFACE_CAPABILITIES_EXT](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

To query the basic capabilities of a surface, needed in order to create a
swapchain, call:

// Provided by VK_EXT_display_surface_counter
VkResult vkGetPhysicalDeviceSurfaceCapabilities2EXT(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    VkSurfaceCapabilities2EXT*                  pSurfaceCapabilities);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pSurfaceCapabilities` is a pointer to a
[VkSurfaceCapabilities2EXT](#VkSurfaceCapabilities2EXT) structure in which the capabilities are
returned.

`vkGetPhysicalDeviceSurfaceCapabilities2EXT` behaves similarly to
[vkGetPhysicalDeviceSurfaceCapabilitiesKHR](#vkGetPhysicalDeviceSurfaceCapabilitiesKHR), with the ability to return
extended information by adding extending structures to the `pNext` chain
of its `pSurfaceCapabilities` parameter.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-06211) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-06211

`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-pSurfaceCapabilities-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-pSurfaceCapabilities-parameter

 `pSurfaceCapabilities` **must** be a valid pointer to a [VkSurfaceCapabilities2EXT](#VkSurfaceCapabilities2EXT) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-commonparent) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-commonparent

 Both of `physicalDevice`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSurfaceCapabilities2EXT` structure is defined as:

// Provided by VK_EXT_display_surface_counter
typedef struct VkSurfaceCapabilities2EXT {
    VkStructureType                  sType;
    void*                            pNext;
    uint32_t                         minImageCount;
    uint32_t                         maxImageCount;
    VkExtent2D                       currentExtent;
    VkExtent2D                       minImageExtent;
    VkExtent2D                       maxImageExtent;
    uint32_t                         maxImageArrayLayers;
    VkSurfaceTransformFlagsKHR       supportedTransforms;
    VkSurfaceTransformFlagBitsKHR    currentTransform;
    VkCompositeAlphaFlagsKHR         supportedCompositeAlpha;
    VkImageUsageFlags                supportedUsageFlags;
    VkSurfaceCounterFlagsEXT         supportedSurfaceCounters;
} VkSurfaceCapabilities2EXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minImageCount` is the minimum number of images the specified device
supports for a swapchain created for the surface, and will be at least
one.

* 
`maxImageCount` is the maximum number of images the specified device
supports for a swapchain created for the surface, and will be either 0,
or greater than or equal to `minImageCount`.
A value of 0 means that there is no limit on the number of images,
though there **may** be limits related to the total amount of memory used
by presentable images.

* 
`currentExtent` is the current width and height of the surface, or
the special value (0xFFFFFFFF, 0xFFFFFFFF) indicating that the
surface size will be determined by the extent of a swapchain targeting
the surface.

* 
`minImageExtent` contains the smallest valid swapchain extent for
the surface on the specified device.
The `width` and `height` of the extent will each be less than or
equal to the corresponding `width` and `height` of
`currentExtent`, unless `currentExtent` has the special value
described above.

* 
`maxImageExtent` contains the largest valid swapchain extent for the
surface on the specified device.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
`minImageExtent`.
The `width` and `height` of the extent will each be greater than
or equal to the corresponding `width` and `height` of
`currentExtent`, unless `currentExtent` has the special value
described above.

* 
`maxImageArrayLayers` is the maximum number of layers presentable
images **can** have for a swapchain created for this device and surface,
and will be at least one.

* 
`supportedTransforms` is a bitmask of
[VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) indicating the presentation
transforms supported for the surface on the specified device.
At least one bit will be set.

* 
`currentTransform` is [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) value
indicating the surface’s current transform relative to the presentation
engine’s natural orientation.

* 
`supportedCompositeAlpha` is a bitmask of
[VkCompositeAlphaFlagBitsKHR](#VkCompositeAlphaFlagBitsKHR), representing the alpha compositing
modes supported by the presentation engine for the surface on the
specified device, and at least one bit will be set.
Opaque composition **can** be achieved in any alpha compositing mode by
either using an image format that has no alpha component, or by ensuring
that all pixels in the presentable images have an alpha value of 1.0.

* 
`supportedUsageFlags` is a bitmask of [VkImageUsageFlagBits](../resources.html#VkImageUsageFlagBits)
representing the ways the application **can** use the presentable images of
a swapchain created
with [VkPresentModeKHR](#VkPresentModeKHR) set to
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR), [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR)
for the surface on the specified device.
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](../resources.html#VkImageUsageFlagBits) **must** be included in the set.
Implementations **may** support additional usages.

* 
`supportedSurfaceCounters` is a bitmask of
[VkSurfaceCounterFlagBitsEXT](#VkSurfaceCounterFlagBitsEXT) indicating the supported surface
counter types.

Valid Usage

* 
[](#VUID-VkSurfaceCapabilities2EXT-supportedSurfaceCounters-01246) VUID-VkSurfaceCapabilities2EXT-supportedSurfaceCounters-01246

`supportedSurfaceCounters` **must** not include
[VK_SURFACE_COUNTER_VBLANK_BIT_EXT](#VkSurfaceCounterFlagBitsEXT) unless the surface queried is a
[display surface](#wsi-display-surfaces)

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceCapabilities2EXT-sType-sType) VUID-VkSurfaceCapabilities2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfaceCapabilities2EXT-pNext-pNext) VUID-VkSurfaceCapabilities2EXT-pNext-pNext

 `pNext` **must** be `NULL`

Bits which **can** be set in
[VkSurfaceCapabilities2EXT](#VkSurfaceCapabilities2EXT)::`supportedSurfaceCounters`, indicating
supported surface counter types, are:

// Provided by VK_EXT_display_surface_counter
typedef enum VkSurfaceCounterFlagBitsEXT {
    VK_SURFACE_COUNTER_VBLANK_BIT_EXT = 0x00000001,
  // VK_SURFACE_COUNTER_VBLANK_EXT is a legacy alias
    VK_SURFACE_COUNTER_VBLANK_EXT = VK_SURFACE_COUNTER_VBLANK_BIT_EXT,
} VkSurfaceCounterFlagBitsEXT;

* 
[VK_SURFACE_COUNTER_VBLANK_BIT_EXT](#VkSurfaceCounterFlagBitsEXT) specifies a counter incrementing
once every time a vertical blanking period occurs on the display
associated with the surface.

// Provided by VK_EXT_display_surface_counter
typedef VkFlags VkSurfaceCounterFlagsEXT;

`VkSurfaceCounterFlagsEXT` is a bitmask type for setting a mask of zero
or more [VkSurfaceCounterFlagBitsEXT](#VkSurfaceCounterFlagBitsEXT).

Bits which **may** be set in
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`supportedTransforms` indicating the
presentation transforms supported for the surface on the specified device,
and possible values of
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`currentTransform` indicating the
surface’s current transform relative to the presentation engine’s natural
orientation, are:

// Provided by VK_KHR_surface
typedef enum VkSurfaceTransformFlagBitsKHR {
    VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR = 0x00000001,
    VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR = 0x00000002,
    VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR = 0x00000004,
    VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR = 0x00000008,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_BIT_KHR = 0x00000010,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_90_BIT_KHR = 0x00000020,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_180_BIT_KHR = 0x00000040,
    VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_270_BIT_KHR = 0x00000080,
    VK_SURFACE_TRANSFORM_INHERIT_BIT_KHR = 0x00000100,
} VkSurfaceTransformFlagBitsKHR;

* 
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies that image content
is presented without being transformed.

* 
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies that image
content is rotated 90 degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies that image
content is rotated 180 degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies that image
content is rotated 270 degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies that
image content is mirrored horizontally.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_90_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies
that image content is mirrored horizontally, then rotated 90 degrees
clockwise.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_180_BIT_KHR](#VkSurfaceTransformFlagBitsKHR)
specifies that image content is mirrored horizontally, then rotated 180
degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_HORIZONTAL_MIRROR_ROTATE_270_BIT_KHR](#VkSurfaceTransformFlagBitsKHR)
specifies that image content is mirrored horizontally, then rotated 270
degrees clockwise.

* 
[VK_SURFACE_TRANSFORM_INHERIT_BIT_KHR](#VkSurfaceTransformFlagBitsKHR) specifies that the
presentation transform is not specified, and is instead determined by
platform-specific considerations and mechanisms outside Vulkan.

// Provided by VK_KHR_display
typedef VkFlags VkSurfaceTransformFlagsKHR;

`VkSurfaceTransformFlagsKHR` is a bitmask type for setting a mask of
zero or more [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR).

The `supportedCompositeAlpha` member is of type
[VkCompositeAlphaFlagBitsKHR](#VkCompositeAlphaFlagBitsKHR), containing the following values:

// Provided by VK_KHR_surface
typedef enum VkCompositeAlphaFlagBitsKHR {
    VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR = 0x00000001,
    VK_COMPOSITE_ALPHA_PRE_MULTIPLIED_BIT_KHR = 0x00000002,
    VK_COMPOSITE_ALPHA_POST_MULTIPLIED_BIT_KHR = 0x00000004,
    VK_COMPOSITE_ALPHA_INHERIT_BIT_KHR = 0x00000008,
} VkCompositeAlphaFlagBitsKHR;

These values are described as follows:

* 
[VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR](#VkCompositeAlphaFlagBitsKHR): The alpha component, if it
exists, of the images is ignored in the compositing process.
Instead, the image is treated as if it has a constant alpha of 1.0.

* 
[VK_COMPOSITE_ALPHA_PRE_MULTIPLIED_BIT_KHR](#VkCompositeAlphaFlagBitsKHR): The alpha component, if
it exists, of the images is respected in the compositing process.
The non-alpha components of the image are expected to already be
multiplied by the alpha component by the application.

* 
[VK_COMPOSITE_ALPHA_POST_MULTIPLIED_BIT_KHR](#VkCompositeAlphaFlagBitsKHR): The alpha component,
if it exists, of the images is respected in the compositing process.
The non-alpha components of the image are not expected to already be
multiplied by the alpha component by the application; instead, the
compositor will multiply the non-alpha components of the image by the
alpha component during compositing.

* 
[VK_COMPOSITE_ALPHA_INHERIT_BIT_KHR](#VkCompositeAlphaFlagBitsKHR): The way in which the
presentation engine treats the alpha component in the images is unknown
to the Vulkan API.
Instead, the application is responsible for setting the composite alpha
blending mode using native window system commands.
If the application does not set the blending mode using native window
system commands, then a platform-specific default will be used.

// Provided by VK_KHR_surface
typedef VkFlags VkCompositeAlphaFlagsKHR;

`VkCompositeAlphaFlagsKHR` is a bitmask type for setting a mask of zero
or more [VkCompositeAlphaFlagBitsKHR](#VkCompositeAlphaFlagBitsKHR).

To query the supported swapchain format-color space pairs for a surface,
call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfaceFormatsKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    uint32_t*                                   pSurfaceFormatCount,
    VkSurfaceFormatKHR*                         pSurfaceFormats);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pSurfaceFormatCount` is a pointer to an integer related to the
number of format pairs available or queried, as described below.

* 
`pSurfaceFormats` is either `NULL` or a pointer to an array of
`VkSurfaceFormatKHR` structures.

If `pSurfaceFormats` is `NULL`, then the number of format pairs
supported for the given `surface` is returned in
`pSurfaceFormatCount`.
Otherwise, `pSurfaceFormatCount` **must** point to a variable set by the
application to the number of elements in the `pSurfaceFormats` array,
and on return the variable is overwritten with the number of structures
actually written to `pSurfaceFormats`.
If the value of `pSurfaceFormatCount` is less than the number of format
pairs supported, at most `pSurfaceFormatCount` structures will be
written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available format pairs were
returned.

The number of format pairs supported **must** be greater than or equal to 1.
`pSurfaceFormats` **must** not contain an entry whose value for
`format` is [VK_FORMAT_UNDEFINED](../formats.html#VkFormat).

If `pSurfaceFormats` includes an entry whose value for `colorSpace`
is [VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](#VkColorSpaceKHR) and whose value for `format`
is a UNORM (or SRGB) format and the corresponding SRGB (or UNORM) format is
a color renderable format for [VK_IMAGE_TILING_OPTIMAL](../resources.html#VkImageTiling), then
`pSurfaceFormats` **must** also contain an entry with the same value for
`colorSpace` and `format` equal to the corresponding SRGB (or UNORM)
format.

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is enabled, the values
returned in `pSurfaceFormats` will be identical for every valid surface
created on this physical device, and so `surface` **can** be
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06524) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06524

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is not enabled,
`surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06525) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06525

If `surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-parameter

 If `surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormatCount-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormatCount-parameter

 `pSurfaceFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormats-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormats-parameter

 If the value referenced by `pSurfaceFormatCount` is not `0`, and `pSurfaceFormats` is not `NULL`, `pSurfaceFormats` **must** be a valid pointer to an array of `pSurfaceFormatCount` [VkSurfaceFormatKHR](#VkSurfaceFormatKHR) structures

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-commonparent) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-commonparent

 Both of `physicalDevice`, and `surface` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSurfaceFormatKHR` structure is defined as:

// Provided by VK_KHR_surface
typedef struct VkSurfaceFormatKHR {
    VkFormat           format;
    VkColorSpaceKHR    colorSpace;
} VkSurfaceFormatKHR;

* 
`format` is a [VkFormat](../formats.html#VkFormat) that is compatible with the specified
surface.

* 
`colorSpace` is a presentation [VkColorSpaceKHR](#VkColorSpaceKHR) that is
compatible with the surface.

To query the supported swapchain format tuples for a surface, call:

// Provided by VK_KHR_get_surface_capabilities2
VkResult vkGetPhysicalDeviceSurfaceFormats2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    uint32_t*                                   pSurfaceFormatCount,
    VkSurfaceFormat2KHR*                        pSurfaceFormats);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pSurfaceInfo` is a pointer to a
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure describing the surface
and other fixed parameters that would be consumed by
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pSurfaceFormatCount` is a pointer to an integer related to the
number of format tuples available or queried, as described below.

* 
`pSurfaceFormats` is either `NULL` or a pointer to an array of
[VkSurfaceFormat2KHR](#VkSurfaceFormat2KHR) structures.

[vkGetPhysicalDeviceSurfaceFormats2KHR](#vkGetPhysicalDeviceSurfaceFormats2KHR) behaves similarly to
[vkGetPhysicalDeviceSurfaceFormatsKHR](#vkGetPhysicalDeviceSurfaceFormatsKHR), with the ability to be extended
via `pNext` chains.

If `pSurfaceFormats` is `NULL`, then the number of format tuples
supported for the given `surface` is returned in
`pSurfaceFormatCount`.
Otherwise, `pSurfaceFormatCount` **must** point to a variable set by the
application to the number of elements in the `pSurfaceFormats` array,
and on return the variable is overwritten with the number of structures
actually written to `pSurfaceFormats`.
If the value of `pSurfaceFormatCount` is less than the number of format
tuples supported, at most `pSurfaceFormatCount` structures will be
written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available values were
returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06521) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06521

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is not enabled,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06522) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06522

If `pSurfaceInfo->surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`pSurfaceInfo->surface` **must** be supported by `physicalDevice`,
as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an
equivalent platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormatCount-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormatCount-parameter

 `pSurfaceFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormats-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormats-parameter

 If the value referenced by `pSurfaceFormatCount` is not `0`, and `pSurfaceFormats` is not `NULL`, `pSurfaceFormats` **must** be a valid pointer to an array of `pSurfaceFormatCount` [VkSurfaceFormat2KHR](#VkSurfaceFormat2KHR) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSurfaceFormat2KHR` structure is defined as:

// Provided by VK_KHR_get_surface_capabilities2
typedef struct VkSurfaceFormat2KHR {
    VkStructureType       sType;
    void*                 pNext;
    VkSurfaceFormatKHR    surfaceFormat;
} VkSurfaceFormat2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surfaceFormat` is a [VkSurfaceFormatKHR](#VkSurfaceFormatKHR) structure describing a
format-color space pair that is compatible with the specified surface.

If the [`imageCompressionControlSwapchain`](../features.html#features-imageCompressionControlSwapchain) feature is supported and a
[VkImageCompressionPropertiesEXT](../resources.html#VkImageCompressionPropertiesEXT) structure is included in the
`pNext` chain of this structure, then it will be filled with the
compression properties that are supported for the `surfaceFormat`.

Valid Usage

* 
[](#VUID-VkSurfaceFormat2KHR-pNext-06750) VUID-VkSurfaceFormat2KHR-pNext-06750

If the `[VK_EXT_image_compression_control_swapchain](../../appendices/extensions.html#VK_EXT_image_compression_control_swapchain)` extension is
not supported, the
`pNext` chain **must** not include an
[VkImageCompressionPropertiesEXT](../resources.html#VkImageCompressionPropertiesEXT) structure

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceFormat2KHR-sType-sType) VUID-VkSurfaceFormat2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_FORMAT_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSurfaceFormat2KHR-pNext-pNext) VUID-VkSurfaceFormat2KHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkImageCompressionPropertiesEXT](../resources.html#VkImageCompressionPropertiesEXT)

* 
[](#VUID-VkSurfaceFormat2KHR-sType-unique) VUID-VkSurfaceFormat2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

While the `format` of a presentable image refers to the encoding of each
pixel, the `colorSpace` determines how the presentation engine
interprets the pixel values.
A color space in this document refers to a specific color space (defined by
the chromaticities of its primaries and a white point in CIE Lab), and
transfer functions indicating the mapping between the image data and the
colorimetry with respect to the given color space.

Possible values of [VkSurfaceFormatKHR](#VkSurfaceFormatKHR)::`colorSpace`, specifying
the color spaces that a presentation engine can accept, are:

// Provided by VK_KHR_surface
typedef enum VkColorSpaceKHR {
    VK_COLOR_SPACE_SRGB_NONLINEAR_KHR = 0,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_DISPLAY_P3_NONLINEAR_EXT = 1000104001,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_EXTENDED_SRGB_LINEAR_EXT = 1000104002,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT = 1000104003,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_DCI_P3_NONLINEAR_EXT = 1000104004,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_BT709_LINEAR_EXT = 1000104005,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_BT709_NONLINEAR_EXT = 1000104006,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_BT2020_LINEAR_EXT = 1000104007,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_HDR10_ST2084_EXT = 1000104008,
  // Provided by VK_EXT_swapchain_colorspace
  // VK_COLOR_SPACE_DOLBYVISION_EXT is legacy, but no reason was given in the API XML
    VK_COLOR_SPACE_DOLBYVISION_EXT = 1000104009,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_HDR10_HLG_EXT = 1000104010,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_ADOBERGB_LINEAR_EXT = 1000104011,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_ADOBERGB_NONLINEAR_EXT = 1000104012,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_PASS_THROUGH_EXT = 1000104013,
  // Provided by VK_EXT_swapchain_colorspace
    VK_COLOR_SPACE_EXTENDED_SRGB_NONLINEAR_EXT = 1000104014,
  // Provided by VK_AMD_display_native_hdr
    VK_COLOR_SPACE_DISPLAY_NATIVE_AMD = 1000213000,
  // VK_COLORSPACE_SRGB_NONLINEAR_KHR is a legacy alias
    VK_COLORSPACE_SRGB_NONLINEAR_KHR = VK_COLOR_SPACE_SRGB_NONLINEAR_KHR,
  // Provided by VK_EXT_swapchain_colorspace
  // VK_COLOR_SPACE_DCI_P3_LINEAR_EXT is a legacy alias
    VK_COLOR_SPACE_DCI_P3_LINEAR_EXT = VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT,
} VkColorSpaceKHR;

* 
[VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](#VkColorSpaceKHR) specifies support for the images
in sRGB color space, encoded according to the sRGB specification.

* 
[VK_COLOR_SPACE_DISPLAY_P3_NONLINEAR_EXT](#VkColorSpaceKHR) specifies support for the
images in Display-P3 color space, encoded using a Display-P3 transfer
function.

* 
[VK_COLOR_SPACE_EXTENDED_SRGB_LINEAR_EXT](#VkColorSpaceKHR) specifies support for the
images in extended sRGB color space, encoded using a linear transfer
function.

* 
[VK_COLOR_SPACE_EXTENDED_SRGB_NONLINEAR_EXT](#VkColorSpaceKHR) specifies support for
the images in extended sRGB color space, encoded according to the scRGB
specification.

* 
[VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT](#VkColorSpaceKHR) specifies support for the
images in Display-P3 color space, encoded using a linear transfer
function.

* 
[VK_COLOR_SPACE_DCI_P3_NONLINEAR_EXT](#VkColorSpaceKHR) specifies support for the
images in DCI-P3 color space, encoded according to the DCI-P3
specification.
Note that values in such an image are interpreted as XYZ encoded color
data by the presentation engine.

* 
[VK_COLOR_SPACE_BT709_LINEAR_EXT](#VkColorSpaceKHR) specifies support for the images
in BT709 color space, encoded using a linear transfer function.

* 
[VK_COLOR_SPACE_BT709_NONLINEAR_EXT](#VkColorSpaceKHR) specifies support for the
images in BT709 color space, encoded according to the BT709
specification.

* 
[VK_COLOR_SPACE_BT2020_LINEAR_EXT](#VkColorSpaceKHR) specifies support for the images
in BT2020 color space, encoded using a linear transfer function.

* 
[VK_COLOR_SPACE_HDR10_ST2084_EXT](#VkColorSpaceKHR) specifies support for the images
in HDR10 (BT2020) color space, encoded according to SMPTE ST2084
Perceptual Quantizer (PQ) specification.

* 
[VK_COLOR_SPACE_HDR10_HLG_EXT](#VkColorSpaceKHR) specifies support for the images in
HDR10 (BT2020) color space, encoded according to the Hybrid Log Gamma
(HLG) specification.

* 
[VK_COLOR_SPACE_ADOBERGB_LINEAR_EXT](#VkColorSpaceKHR) specifies support for images in
Adobe RGB color space, encoded using a linear transfer function.

* 
[VK_COLOR_SPACE_ADOBERGB_NONLINEAR_EXT](#VkColorSpaceKHR) specifies support for the
images in Adobe RGB color space, encoded according to the Adobe RGB
specification (approximately Gamma 2.2).

* 
[VK_COLOR_SPACE_PASS_THROUGH_EXT](#VkColorSpaceKHR) specifies that color components
are used “as is”.
This is intended to allow applications to supply data for color spaces
not described here.

* 
[VK_COLOR_SPACE_DISPLAY_NATIVE_AMD](#VkColorSpaceKHR) specifies support for the
display’s native color space.
This matches the color space expectations of AMD’s FreeSync2 standard,
for displays supporting it.

|  | In the initial release of the `[VK_KHR_surface](../../appendices/extensions.html#VK_KHR_surface)` and
| --- | --- |
`[VK_KHR_swapchain](../../appendices/extensions.html#VK_KHR_swapchain)` extensions, the token
`VK_COLORSPACE_SRGB_NONLINEAR_KHR` was used.
Starting in the 2016-05-13 updates to the extension branches, matching
release 1.0.13 of the core API specification,
[VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](#VkColorSpaceKHR) is used instead for consistency with
Vulkan naming rules.
The older enum is still available for backwards compatibility. |

|  | In older versions of this extension
| --- | --- |
[VK_COLOR_SPACE_DISPLAY_P3_LINEAR_EXT](#VkColorSpaceKHR) was misnamed
`VK_COLOR_SPACE_DCI_P3_LINEAR_EXT`.
This has been updated to indicate that it uses RGB color encoding, not XYZ.
The old name is legacy but is maintained for backwards compatibility. |

|  | In older versions of the `[VK_EXT_swapchain_colorspace](../../appendices/extensions.html#VK_EXT_swapchain_colorspace)` extension,
| --- | --- |
[VK_COLOR_SPACE_DOLBYVISION_EXT](#VkColorSpaceKHR) was exposed.
The intent was to indicate the presentation engine shall decode an image
using the SMPTE ST 2084 Perceptual Quantizer (PQ) EOTF, and then apply a
proprietary OOTF to process the image.
However, Dolby Vision profile 8.4 describes an encoding using the Hybrid Log
Gamma (HLG) OETF, and there is no swapchain extension for signaling Dolby
Vision metadata to be used by a proprietary OOTF.
This enum is legacy but is maintained for backwards compatibility. |

|  | For a traditional “Linear” or non-gamma transfer function color space use
| --- | --- |
[VK_COLOR_SPACE_PASS_THROUGH_EXT](#VkColorSpaceKHR). |

|  | On Wayland, [VK_COLOR_SPACE_PASS_THROUGH_EXT](#VkColorSpaceKHR) can be used to disable
| --- | --- |
color management by the WSI on a surface, which makes it possible for the
application to create a `wp_color_management_surface_v1` object without
triggering a `surface_exists` protocol error.

See [vkCreateWaylandSurfaceKHR](#vkCreateWaylandSurfaceKHR) |

The presentation engine interprets the pixel values of the R, G, and B
components as having been encoded using an appropriate transfer function.
Applications **should** ensure that the appropriate transfer function has been
applied.
[Texel encode](../images.html#images-texel-encode) requires that all implementations
implicitly apply the sRGB EOTF-1 on R, G, and B components when shaders
write to an sRGB pixel format image, which is useful for sRGB color spaces.
For sRGB color spaces with other pixel formats, or other non-linear color
spaces, applications **can** apply the transfer function explicitly in a
shader.
The A channel is always interpreted as linearly encoded.

This extension defines enums for [VkColorSpaceKHR](#VkColorSpaceKHR) that correspond to
the following color spaces:

| Name | Red Primary | Green Primary | Blue Primary | White-point | Transfer function |
| --- | --- | --- | --- | --- | --- |
| DCI-P3 | 1.000, 0.000 | 0.000, 1.000 | 0.000, 0.000 | 0.3333, 0.3333 | DCI P3 |
| Display-P3 | 0.680, 0.320 | 0.265, 0.690 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | Display-P3 |
| BT709 | 0.640, 0.330 | 0.300, 0.600 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | BT709 |
| sRGB | 0.640, 0.330 | 0.300, 0.600 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | sRGB |
| extended sRGB | 0.640, 0.330 | 0.300, 0.600 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | scRGB |
| HDR10_ST2084 | 0.708, 0.292 | 0.170, 0.797 | 0.131, 0.046 | 0.3127, 0.3290 (D65) | ST2084 PQ |
| HDR10_HLG | 0.708, 0.292 | 0.170, 0.797 | 0.131, 0.046 | 0.3127, 0.3290 (D65) | HLG |
| Adobe RGB | 0.640, 0.330 | 0.210, 0.710 | 0.150, 0.060 | 0.3127, 0.3290 (D65) | Adobe RGB |

The transfer functions are described in the “Transfer Functions” chapter
of the [Khronos Data Format Specification](../introduction.html#data-format).

Except Display-P3 OETF, which is:

  

  

where L is the linear value of a color component and E is the
encoded value (as stored in the image in memory).

|  | For most uses, the sRGB OETF is equivalent. |
| --- | --- |

To query the supported presentation modes for a surface, call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfacePresentModesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    uint32_t*                                   pPresentModeCount,
    VkPresentModeKHR*                           pPresentModes);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pPresentModeCount` is a pointer to an integer related to the number
of presentation modes available or queried, as described below.

* 
`pPresentModes` is either `NULL` or a pointer to an array of
[VkPresentModeKHR](#VkPresentModeKHR) values, indicating the supported presentation
modes.

If `pPresentModes` is `NULL`, then the number of presentation modes
supported for the given `surface` is returned in
`pPresentModeCount`.
Otherwise, `pPresentModeCount` **must** point to a variable set by the
application to the number of elements in the `pPresentModes` array, and
on return the variable is overwritten with the number of values actually
written to `pPresentModes`.
If the value of `pPresentModeCount` is less than the number of
presentation modes supported, at most `pPresentModeCount` values will be
written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available modes were
returned.

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is enabled and
`surface` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the values returned in
`pPresentModes` will only indicate support for
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR), and
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR).
To query support for any other present mode, a valid handle **must** be
provided in `surface`.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06524) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06524

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is not enabled,
`surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06525) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06525

If `surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-parameter

 If `surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModeCount-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModeCount-parameter

 `pPresentModeCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModes-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModes-parameter

 If the value referenced by `pPresentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `pPresentModeCount` [VkPresentModeKHR](#VkPresentModeKHR) values

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-commonparent) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-commonparent

 Both of `physicalDevice`, and `surface` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To query the supported presentation modes for a surface combined with select
other fixed swapchain creation parameters, call:

// Provided by VK_EXT_full_screen_exclusive
VkResult vkGetPhysicalDeviceSurfacePresentModes2EXT(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    uint32_t*                                   pPresentModeCount,
    VkPresentModeKHR*                           pPresentModes);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pSurfaceInfo` is a pointer to a
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure describing the surface
and other fixed parameters that would be consumed by
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pPresentModeCount` is a pointer to an integer related to the number
of presentation modes available or queried, as described below.

* 
`pPresentModes` is either `NULL` or a pointer to an array of
[VkPresentModeKHR](#VkPresentModeKHR) values, indicating the supported presentation
modes.

`vkGetPhysicalDeviceSurfacePresentModes2EXT` behaves similarly to
[vkGetPhysicalDeviceSurfacePresentModesKHR](#vkGetPhysicalDeviceSurfacePresentModesKHR), with the ability to specify
extended inputs via chained input structures.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06521) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06521

If the `[VK_GOOGLE_surfaceless_query](../../appendices/extensions.html#VK_GOOGLE_surfaceless_query)` extension is not enabled,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06522) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06522

If `pSurfaceInfo->surface` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE),
`pSurfaceInfo->surface` **must** be supported by `physicalDevice`,
as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an
equivalent platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModeCount-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModeCount-parameter

 `pPresentModeCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModes-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModes-parameter

 If the value referenced by `pPresentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `pPresentModeCount` [VkPresentModeKHR](#VkPresentModeKHR) values

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

Possible values of elements of the
[vkGetPhysicalDeviceSurfacePresentModesKHR](#vkGetPhysicalDeviceSurfacePresentModesKHR)::`pPresentModes` array,
indicating the supported presentation modes for a surface, are:

// Provided by VK_KHR_surface
typedef enum VkPresentModeKHR {
    VK_PRESENT_MODE_IMMEDIATE_KHR = 0,
    VK_PRESENT_MODE_MAILBOX_KHR = 1,
    VK_PRESENT_MODE_FIFO_KHR = 2,
    VK_PRESENT_MODE_FIFO_RELAXED_KHR = 3,
  // Provided by VK_KHR_shared_presentable_image
    VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR = 1000111000,
  // Provided by VK_KHR_shared_presentable_image
    VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR = 1000111001,
  // Provided by VK_KHR_present_mode_fifo_latest_ready
    VK_PRESENT_MODE_FIFO_LATEST_READY_KHR = 1000361000,
  // Provided by VK_EXT_present_mode_fifo_latest_ready
    VK_PRESENT_MODE_FIFO_LATEST_READY_EXT = VK_PRESENT_MODE_FIFO_LATEST_READY_KHR,
} VkPresentModeKHR;

* 
[VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR) specifies that the presentation
engine does not wait for a vertical blanking period to update the
current image, meaning this mode **may** result in visible tearing.
No internal queuing of presentation requests is needed, as the requests
are applied immediately.

* 
[VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR) specifies that the presentation engine
waits for the next vertical blanking period to update the current image.
Tearing **cannot** be observed.
An internal single-entry queue is used to hold pending presentation
requests.
If the queue is full when a new presentation request is received, the
new request replaces the existing entry, and any images associated with
the prior entry become available for reuse by the application.
One request is removed from the queue and processed during each vertical
blanking period in which the queue is non-empty.

* 
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) specifies that the presentation engine
waits for the next vertical blanking period to update the current image.
Tearing **cannot** be observed.
An internal queue is used to hold pending presentation requests.
New requests are appended to the end of the queue, and one request is
removed from the beginning of the queue and processed during each
vertical blanking period in which the queue is non-empty.
This is the only value of `presentMode` that is **required** to be
supported.

* 
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR) specifies that the presentation
engine generally waits for the next vertical blanking period to update
the current image.
If a vertical blanking period has already passed since the last update
of the current image then the presentation engine does not wait for
another vertical blanking period for the update, meaning this mode **may**
result in visible tearing in this case.
This mode is useful for reducing visual stutter with an application that
will mostly present a new image before the next vertical blanking
period, but may occasionally be late, and present a new image just after
the next vertical blanking period.
An internal queue is used to hold pending presentation requests.
New requests are appended to the end of the queue, and one request is
removed from the beginning of the queue and processed during or after
each vertical blanking period in which the queue is non-empty.

* 
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR) specifies that the
    presentation engine waits for the next vertical blanking period to
    update the current image.
    Tearing **cannot** be observed.
    An internal queue is used to hold pending presentation requests.
    New requests are appended to the end of the queue.
    At each vertical blanking period, the presentation engine dequeues all
    successive requests that are ready to be presented from the beginning of
    the queue.
    If using
    the `[VK_GOOGLE_display_timing](../../appendices/extensions.html#VK_GOOGLE_display_timing)` extension
or
    the [`presentAtAbsoluteTime`](../features.html#features-presentAtAbsoluteTime)
    feature
    to provide a target present time, the presentation engine checks the
    specified time for each image.
    If the target present time is less-than or equal-to the current time,
    the presentation engine dequeues the image and checks the next one.
    The image of the last dequeued request is presented.
    The other dequeued requests are dropped.

* 
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) specifies that the
presentation engine and application have concurrent access to a single
image, which is referred to as a *shared presentable image*.
The presentation engine is only required to update the current image
after a new presentation request is received.
Therefore the application **must** make a presentation request whenever an
update is required.
However, the presentation engine **may** update the current image at any
point, meaning this mode **may** result in visible tearing.

* 
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR) specifies that the
presentation engine and application have concurrent access to a single
image, which is referred to as a *shared presentable image*.
The presentation engine periodically updates the current image on its
regular refresh cycle.
The application is only required to make one initial presentation
request, after which the presentation engine **must** update the current
image without any need for further presentation requests.
The application **can** indicate the image contents have been updated by
making a presentation request, but this does not guarantee the timing of
when it will be updated.
This mode **may** result in visible tearing if rendering to the image is
not timed correctly.

The supported [VkImageUsageFlagBits](../resources.html#VkImageUsageFlagBits) of the presentable images of a
swapchain created for a surface **may** differ depending on the presentation
mode, and can be determined as per the table below:

| Presentation mode | Image usage flags |
| --- | --- |
| [VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR) | [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR) | [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) | [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR) | [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR) | [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`supportedUsageFlags` |
| [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) | [VkSharedPresentSurfaceCapabilitiesKHR](#VkSharedPresentSurfaceCapabilitiesKHR)::`sharedPresentSupportedUsageFlags` |
| [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR) | [VkSharedPresentSurfaceCapabilitiesKHR](#VkSharedPresentSurfaceCapabilitiesKHR)::`sharedPresentSupportedUsageFlags` |

|  | For reference, the mode indicated by [VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) is
| --- | --- |
equivalent to the behavior of {wgl\|glX\|egl}SwapBuffers with a swap interval
of 1, while the mode indicated by [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR) is
equivalent to the behavior of {wgl\|glX}SwapBuffers with a swap interval of
-1 (from the {WGL\|GLX}_EXT_swap_control_tear extensions). |

Swapchains created with `fullScreenExclusive` set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT) **must** acquire and
release exclusive full-screen access explicitly, using the following
commands.

To acquire exclusive full-screen access for a swapchain, call:

// Provided by VK_EXT_full_screen_exclusive
VkResult vkAcquireFullScreenExclusiveModeEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to acquire exclusive full-screen access
for.

Valid Usage

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02674) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02674

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02675) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02675

`swapchain` **must** be a swapchain created with a
[VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT) structure, with
`fullScreenExclusive` set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT)

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02676) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-02676

`swapchain` **must** not currently have exclusive full-screen access

A return value of [VK_SUCCESS](../fundamentals.html#VkResult) indicates that the `swapchain`
successfully acquired exclusive full-screen access.
The swapchain will retain this exclusivity until either the application
releases exclusive full-screen access with
[vkReleaseFullScreenExclusiveModeEXT](#vkReleaseFullScreenExclusiveModeEXT), destroys the swapchain, or if any
of the swapchain commands return
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult) indicating that the mode
was lost because of platform-specific changes.

If the swapchain was unable to acquire exclusive full-screen access to the
display then [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult) is returned.
An application **can** attempt to acquire exclusive full-screen access again
for the same swapchain even if this command fails, or if
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult) has been returned by a
swapchain command.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-device-parameter) VUID-vkAcquireFullScreenExclusiveModeEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parameter) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parent) VUID-vkAcquireFullScreenExclusiveModeEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To release exclusive full-screen access from a swapchain, call:

// Provided by VK_EXT_full_screen_exclusive
VkResult vkReleaseFullScreenExclusiveModeEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to release exclusive full-screen access
from.

|  | Applications will not be able to present to `swapchain` after this call
| --- | --- |
until exclusive full-screen access is reacquired.
This is usually useful to handle when an application is minimized or
otherwise intends to stop presenting for a time. |

Valid Usage

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02677) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02677

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02678) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-02678

`swapchain` **must** be a swapchain created with a
[VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT) structure, with
`fullScreenExclusive` set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT)

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-device-parameter) VUID-vkReleaseFullScreenExclusiveModeEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parameter) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parent) VUID-vkReleaseFullScreenExclusiveModeEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

A logical device that represents multiple physical devices **may** support
presenting from images on more than one physical device, or combining images
from multiple physical devices.

To query these capabilities, call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
VkResult vkGetDeviceGroupPresentCapabilitiesKHR(
    VkDevice                                    device,
    VkDeviceGroupPresentCapabilitiesKHR*        pDeviceGroupPresentCapabilities);

* 
`device` is the logical device.

* 
`pDeviceGroupPresentCapabilities` is a pointer to a
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR) structure in which the
device’s capabilities are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupPresentCapabilitiesKHR-device-parameter) VUID-vkGetDeviceGroupPresentCapabilitiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceGroupPresentCapabilitiesKHR-pDeviceGroupPresentCapabilities-parameter) VUID-vkGetDeviceGroupPresentCapabilitiesKHR-pDeviceGroupPresentCapabilities-parameter

 `pDeviceGroupPresentCapabilities` **must** be a valid pointer to a [VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR) structure

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkDeviceGroupPresentCapabilitiesKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
typedef struct VkDeviceGroupPresentCapabilitiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    uint32_t                            presentMask[VK_MAX_DEVICE_GROUP_SIZE];
    VkDeviceGroupPresentModeFlagsKHR    modes;
} VkDeviceGroupPresentCapabilitiesKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentMask` is an array of [VK_MAX_DEVICE_GROUP_SIZE](../devsandqueues.html#VK_MAX_DEVICE_GROUP_SIZE)
`uint32_t` masks, where the mask at element i is non-zero if
physical device i has a presentation engine, and where bit j
is set in element i if physical device i **can** present
swapchain images from physical device j.
If element i is non-zero, then bit i **must** be set.

* 
`modes` is a bitmask of [VkDeviceGroupPresentModeFlagBitsKHR](#VkDeviceGroupPresentModeFlagBitsKHR)
indicating which device group presentation modes are supported.

`modes` always has [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR) set.

The present mode flags are also used when presenting an image, in
[VkDeviceGroupPresentInfoKHR](#VkDeviceGroupPresentInfoKHR)::`mode`.

If a device group only includes a single physical device, then `modes`
**must** equal [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupPresentCapabilitiesKHR-sType-sType) VUID-VkDeviceGroupPresentCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_CAPABILITIES_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceGroupPresentCapabilitiesKHR-pNext-pNext) VUID-VkDeviceGroupPresentCapabilitiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

Bits which **may** be set in
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`modes`, indicating which
device group presentation modes are supported, are:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
typedef enum VkDeviceGroupPresentModeFlagBitsKHR {
    VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR = 0x00000001,
    VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR = 0x00000002,
    VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR = 0x00000004,
    VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR = 0x00000008,
} VkDeviceGroupPresentModeFlagBitsKHR;

* 
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR) specifies that any
physical device with a presentation engine **can** present its own
swapchain images.

* 
[VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR) specifies that any
physical device with a presentation engine **can** present swapchain images
from any physical device in its `presentMask`.

* 
[VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR) specifies that any
physical device with a presentation engine **can** present the sum of
swapchain images from any physical devices in its `presentMask`.

* 
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR) specifies
that multiple physical devices with a presentation engine **can** each
present their own swapchain images.

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
typedef VkFlags VkDeviceGroupPresentModeFlagsKHR;

`VkDeviceGroupPresentModeFlagsKHR` is a bitmask type for setting a mask
of zero or more [VkDeviceGroupPresentModeFlagBitsKHR](#VkDeviceGroupPresentModeFlagBitsKHR).

Some surfaces **may** not be capable of using all the device group present
modes.

To query the supported device group present modes for a particular surface,
call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
VkResult vkGetDeviceGroupSurfacePresentModesKHR(
    VkDevice                                    device,
    VkSurfaceKHR                                surface,
    VkDeviceGroupPresentModeFlagsKHR*           pModes);

* 
`device` is the logical device.

* 
`surface` is the surface.

* 
`pModes` is a pointer to a [VkDeviceGroupPresentModeFlagsKHR](#VkDeviceGroupPresentModeFlagsKHR) in
which the supported device group present modes for the surface are
returned.

The modes returned by this command are not invariant, and **may** change in
response to the surface being moved, resized, or occluded.
These modes **must** be a subset of the modes returned by
[vkGetDeviceGroupPresentCapabilitiesKHR](#vkGetDeviceGroupPresentCapabilitiesKHR).

Valid Usage

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-06212) VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-06212

`surface` **must** be supported by all physical devices associated with
`device`, as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR)
or an equivalent platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-device-parameter) VUID-vkGetDeviceGroupSurfacePresentModesKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-parameter) VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-pModes-parameter) VUID-vkGetDeviceGroupSurfacePresentModesKHR-pModes-parameter

 `pModes` **must** be a valid pointer to a [VkDeviceGroupPresentModeFlagsKHR](#VkDeviceGroupPresentModeFlagsKHR) value

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-commonparent) VUID-vkGetDeviceGroupSurfacePresentModesKHR-commonparent

 Both of `device`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To query the supported device group presentation modes for a surface
combined with select other fixed swapchain creation parameters, call:

// Provided by VK_EXT_full_screen_exclusive with VK_KHR_device_group or VK_VERSION_1_1
VkResult vkGetDeviceGroupSurfacePresentModes2EXT(
    VkDevice                                    device,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    VkDeviceGroupPresentModeFlagsKHR*           pModes);

* 
`device` is the logical device.

* 
`pSurfaceInfo` is a pointer to a
[VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure describing the surface
and other fixed parameters that would be consumed by
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR).

* 
`pModes` is a pointer to a [VkDeviceGroupPresentModeFlagsKHR](#VkDeviceGroupPresentModeFlagsKHR) in
which the supported device group present modes for the surface are
returned.

`vkGetDeviceGroupSurfacePresentModes2EXT` behaves similarly to
[vkGetDeviceGroupSurfacePresentModesKHR](#vkGetDeviceGroupSurfacePresentModesKHR), with the ability to specify
extended inputs via chained input structures.

Valid Usage

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-06213) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-06213

`pSurfaceInfo->surface` **must** be supported by all physical devices
associated with `device`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-device-parameter) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-parameter) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](#VkPhysicalDeviceSurfaceInfo2KHR) structure

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pModes-parameter) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pModes-parameter

 `pModes` **must** be a valid pointer to a [VkDeviceGroupPresentModeFlagsKHR](#VkDeviceGroupPresentModeFlagsKHR) value

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

When using [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR),
the application **may** need to know which regions of the surface are used when
presenting locally on each physical device.
Presentation of swapchain images to this surface need only have valid
contents in the regions returned by this command.

To query a set of rectangles used in presentation on the physical device,
call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
VkResult vkGetPhysicalDevicePresentRectanglesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    uint32_t*                                   pRectCount,
    VkRect2D*                                   pRects);

* 
`physicalDevice` is the physical device.

* 
`surface` is the surface.

* 
`pRectCount` is a pointer to an integer related to the number of
rectangles available or queried, as described below.

* 
`pRects` is either `NULL` or a pointer to an array of [VkRect2D](../fundamentals.html#VkRect2D)
structures.

If `pRects` is `NULL`, then the number of rectangles used when
presenting the given `surface` is returned in `pRectCount`.
Otherwise, `pRectCount` **must** point to a variable set by the application
to the number of elements in the `pRects` array, and on return the
variable is overwritten with the number of structures actually written to
`pRects`.
If the value of `pRectCount` is less than the number of rectangles, at
most `pRectCount` structures will be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult)
will be returned instead of [VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the
available rectangles were returned.

The values returned by this command are not invariant, and **may** change in
response to the surface being moved, resized, or occluded.

The rectangles returned by this command **must** not overlap.

Valid Usage

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-06211) VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-06211

`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRectCount-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRectCount-parameter

 `pRectCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRects-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRects-parameter

 If the value referenced by `pRectCount` is not `0`, and `pRects` is not `NULL`, `pRects` **must** be a valid pointer to an array of `pRectCount` [VkRect2D](../fundamentals.html#VkRect2D) structures

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-commonparent) VUID-vkGetPhysicalDevicePresentRectanglesKHR-commonparent

 Both of `physicalDevice`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

Traditional game and real-time-animation applications frequently use
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) so that presentable images are updated during
the vertical blanking period of a given refresh cycle (RC) of the
presentation engine’s display.
On fixed refresh rate displays, this avoids the visual anomaly known as
tearing.

However, synchronizing the presentation of images with the RC does not
prevent all forms of visual anomalies.
Stuttering occurs when the geometry for each presentable image is not
accurately positioned for when that image will be displayed.
The geometry may appear to move too little some RCs, and too much for
others.
Sometimes the animation appears to freeze, when the same image is used for
more RCs than other images.

In order to minimize stuttering, an application needs to: 1) render and
present images at a consistent rate that is, on fixed refresh rate displays,
a multiple of the presentation engine’s refresh rate; 2) correctly position
its geometry for when the presentable image will be displayed to the user.
The
`[VK_EXT_present_timing](../../appendices/extensions.html#VK_EXT_present_timing)`
or
`[VK_GOOGLE_display_timing](../../appendices/extensions.html#VK_GOOGLE_display_timing)`
extension allows an application to satisfy these needs.

The presentation engine’s display typically refreshes the pixels that are
displayed to the user on a periodic basis.
This period **may** be fixed (Fixed Refresh Rate, FRR) or variable (Variable
Refresh Rate, VRR).

In order to collect timing information about presentation, a swapchain needs
an internal queue to store asynchronously updated results until applications
collect them.

To allocate the swapchain’s internal timing results queue, call:

// Provided by VK_EXT_present_timing
VkResult vkSetSwapchainPresentTimingQueueSizeEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint32_t                                    size);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to allocate a results queue for.

* 
`size` is the requested number of slots in the internal results
queue.

If this function is called multiple times, the internal queue is reallocated
to fit the new `size`.
If the new `size` is less than the current number of outstanding
results, [VK_NOT_READY](../fundamentals.html#VkResult) is returned and no allocation is performed.

Valid Usage

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-12229) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-12229

`swapchain` **must** have been created with
`VkSwapchainCreateInfoKHR`::`flags` containing
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](#VkSwapchainCreateFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-device-parameter) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parameter) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parent) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The implementation maintains an internal monotonically increasing counter
which updates when the presentation engine’s timing properties are modified.

To query the presentation engine’s current timing properties for a given
swapchain, call:

// Provided by VK_EXT_present_timing
VkResult vkGetSwapchainTimingPropertiesEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkSwapchainTimingPropertiesEXT*             pSwapchainTimingProperties,
    uint64_t*                                   pSwapchainTimingPropertiesCounter);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain timing properties for.

* 
`pSwapchainTimingProperties` is a pointer to an instance of the
[VkSwapchainTimingPropertiesEXT](#VkSwapchainTimingPropertiesEXT) structure.

* 
`pSwapchainTimingPropertiesCounter` is `NULL` or a pointer to a
64-bit unsigned integer set by the implementation to the current value
of the swapchain’s internal timing properties counter.

If `vkGetSwapchainTimingPropertiesEXT` returns [VK_NOT_READY](../fundamentals.html#VkResult), the
implementation was not able to determine the current refresh cycle duration.
Some platforms **may** not provide timing properties until after at least one
image has been presented to the `swapchain`.
If timing properties change for the `swapchain`, these platforms **may**
not provide updated results until after at least one additional image has
been presented to the `swapchain`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-device-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingProperties-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingProperties-parameter

 `pSwapchainTimingProperties` **must** be a valid pointer to a [VkSwapchainTimingPropertiesEXT](#VkSwapchainTimingPropertiesEXT) structure

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingPropertiesCounter-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingPropertiesCounter-parameter

 If `pSwapchainTimingPropertiesCounter` is not `NULL`, `pSwapchainTimingPropertiesCounter` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parent) VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSwapchainTimingPropertiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkSwapchainTimingPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           refreshDuration;
    uint64_t           refreshInterval;
} VkSwapchainTimingPropertiesEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`refreshDuration` is zero or an indication of the duration of a
refresh cycle.

* 
`refreshInterval` is zero or a duration in nanoseconds indicating
the interval between refresh cycle durations.

If `refreshDuration` is zero, the presentation engine is not able to
determine the duration of the refresh cycle.
Similarly, if `refreshInterval` is zero, the presentation engine is not
able to determine whether it is operating in VRR mode.

Otherwise, if `refreshInterval` is the same as `refreshDuration`,
the presentation engine is operating in FRR mode.
In this case, `refreshDuration` is the number of nanoseconds from the
start of one refresh cycle to the start of the next refresh cycle.

If `refreshInterval` is `UINT64_MAX`, the presentation engine is
operating in VRR mode, and `refreshDuration` is the minimum number of
nanoseconds from the start of one refresh cycle to the start of the next
refresh cycle.

If `refreshDuration` and `refreshInterval` are not zero,
`refreshInterval` is a factor of `refreshDuration`.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainTimingPropertiesEXT-sType-sType) VUID-VkSwapchainTimingPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_TIMING_PROPERTIES_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainTimingPropertiesEXT-pNext-pNext) VUID-VkSwapchainTimingPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

|  | The rate at which an application renders and presents new images is known as
| --- | --- |
the image present rate (IPR, a.k.a.
frame rate).
The inverse of IPR, or the duration between each image present, is the image
present duration (IPD).

In order to provide a smooth, stutter-free animation on non-VRR displays, an
application needs its IPD to be a multiple of `refreshInterval` that is
at least equal to `refreshDuration`.

For example, if a FRR display has a set 60Hz refresh rate, where
`refreshDuration` is equal to `refreshInterval`,
`refreshDuration` will be a value in nanoseconds that is approximately
equal to 16.67ms.
In such a case, an application will want an IPD of 16.67ms (1X multiplier of
`refreshInterval`), or 33.33ms (2X multiplier of `refreshInterval`),
or 50.0ms (3X multiplier of `refreshInterval`), etc.

In order to determine a target IPD for a display (i.e. a multiple of
`refreshInterval`), an application needs to determine when its images
are actually displayed.

Consider an application that has an initial target IPD of 16.67ms (1X
multiplier of `refreshDuration`).
It will therefore position the geometry of a new image 16.67ms later than
the previous image.

If this application is running on slower hardware, so that it actually takes
20ms to render each new image, the images will not be displayed to the user
every 16.67ms, nor every 20ms, which will create visual anomalies.
In this case, it is better for the application to adjust its target IPD to
33.33ms (i.e. a 2X multiplier of `refreshDuration`), and tell the
presentation engine to not present images any sooner than every 33.33ms.
This will allow the geometry to be correctly positioned for each presentable
image.

On VRR displays, where `refreshInterval` is `UINT64_MAX`,
applications **should** target an IPD that is at least equal to
`refreshDuration`.

Adjustments to an application’s IPD may be needed because different views of
an application’s geometry can take different amounts of time to render.
For example, looking at the sky may take less time to render than looking at
multiple, complex items in a room.

In general, it is good to not frequently change IPD, as that can cause
visual anomalies.

Adjustments to a larger IPD because of late images should happen quickly,
but adjustments to a smaller IPD should only happen if the periodic feedback
of [VkPastPresentationTimingEXT](#VkPastPresentationTimingEXT) values indicates that the target IPD
can be durably achieved. |

The implementation maintains an internal monotonically increasing counter
which updates when the presentation engine’s list of supported time domains
for a swapchain is modified.

To query the time domains supported by the presentation engine for a given
swapchain, call:

// Provided by VK_EXT_present_timing
VkResult vkGetSwapchainTimeDomainPropertiesEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkSwapchainTimeDomainPropertiesEXT*         pSwapchainTimeDomainProperties,
    uint64_t*                                   pTimeDomainsCounter);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain time domain properties for.

* 
`pSwapchainTimeDomainProperties` is a pointer to an instance of the
[VkSwapchainTimeDomainPropertiesEXT](#VkSwapchainTimeDomainPropertiesEXT) structure.

* 
`pTimeDomainsCounter` is `NULL` or a pointer to a 64-bit unsigned
integer set by the implementation to the current value of the
swapchain’s internal time domain properties counter.

If upon return
[VkSwapchainTimeDomainPropertiesEXT](#VkSwapchainTimeDomainPropertiesEXT)::`timeDomainCount` is smaller
than the number of time domains supported for the given `swapchain`,
[VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](../fundamentals.html#VkResult) to indicate
that not all the available values were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-device-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-pSwapchainTimeDomainProperties-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-pSwapchainTimeDomainProperties-parameter

 `pSwapchainTimeDomainProperties` **must** be a valid pointer to a [VkSwapchainTimeDomainPropertiesEXT](#VkSwapchainTimeDomainPropertiesEXT) structure

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-pTimeDomainsCounter-parameter) VUID-vkGetSwapchainTimeDomainPropertiesEXT-pTimeDomainsCounter-parameter

 If `pTimeDomainsCounter` is not `NULL`, `pTimeDomainsCounter` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parent) VUID-vkGetSwapchainTimeDomainPropertiesEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSwapchainTimeDomainPropertiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkSwapchainTimeDomainPropertiesEXT {
    VkStructureType     sType;
    void*               pNext;
    uint32_t            timeDomainCount;
    VkTimeDomainKHR*    pTimeDomains;
    uint64_t*           pTimeDomainIds;
} VkSwapchainTimeDomainPropertiesEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`timeDomainCount` is an integer related to the number of time
domains available or queried, as described below.

* 
`pTimeDomains` is a pointer to an array of [VkTimeDomainKHR](../synchronization.html#VkTimeDomainKHR)
values representing time domains that are available for the swapchain.

* 
`pTimeDomainIds` is a pointer to an array of unique identifiers for
each time domain.

When calling [vkGetSwapchainTimeDomainPropertiesEXT](#vkGetSwapchainTimeDomainPropertiesEXT), if
`pTimeDomains` is `NULL` and `pTimeDomainIds` is `NULL`, then the
number of time domains supported for the given `swapchain` is returned
in `timeDomainCount`.
Otherwise, `timeDomainCount` **must** specify the number of elements in
`pTimeDomains` and `pTimeDomainIds`, and on return is overwritten
with the number of values actually written to each array.

|  | Due to the dynamic nature of their underlying `VkSurfaceKHR` properties,
| --- | --- |
swapchains may need to expose multiple swapchain-local opaque time domains
using the same [VkTimeDomainKHR](../synchronization.html#VkTimeDomainKHR) value over time, for example when a
surface is moved from one display hardware to another.
Arbitrary identifiers, provided in `timeDomainIds`, are used by the
implementation to differentiate opaque time domains of identical scopes. |

Valid Usage

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12370) VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12370

`pTimeDomains` and `pTimeDomainIds` **must** both be `NULL` or both
not be `NULL`

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12371) VUID-VkSwapchainTimeDomainPropertiesEXT-pTimeDomains-12371

If `pTimeDomains` and `pTimeDomainIds` are not `NULL`, then
`timeDomainCount` **must** not be zero

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-sType-sType) VUID-VkSwapchainTimeDomainPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_TIME_DOMAIN_PROPERTIES_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainTimeDomainPropertiesEXT-pNext-pNext) VUID-VkSwapchainTimeDomainPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

Because of the asynchronous nature of the presentation engine, the timing
information for a given [vkQueuePresentKHR](#vkQueuePresentKHR) command **may** only becomes
available some time after the presentation has occurred.
These time values **should** be asynchronously queried, and are returned if
available.
All time values are in nanoseconds, according to the time-domain being used.

To asynchronously query the presentation engine for newly-available timing
information about one or more previous presents to a given swapchain, call:

// Provided by VK_EXT_present_timing
VkResult vkGetPastPresentationTimingEXT(
    VkDevice                                    device,
    const VkPastPresentationTimingInfoEXT*      pPastPresentationTimingInfo,
    VkPastPresentationTimingPropertiesEXT*      pPastPresentationTimingProperties);

* 
`device` is the device associated with `swapchain`.

* 
`pPastPresentationTimingInfo` is a pointer to an instance of the
[VkPastPresentationTimingInfoEXT](#VkPastPresentationTimingInfoEXT) structure.

* 
`pPastPresentationTimingProperties` is a pointer to an instance of
the [VkPastPresentationTimingPropertiesEXT](#VkPastPresentationTimingPropertiesEXT) structure.

If upon return the value of
`VkPastPresentationTimingPropertiesEXT`::`presentationTimingCount`
is less than the number of available timing records for the given
`VkPastPresentationTimingInfoEXT`::`swapchain`, [VK_INCOMPLETE](../fundamentals.html#VkResult)
is returned instead of [VK_SUCCESS](../fundamentals.html#VkResult) to indicate that not all the
available values were returned.

Upon return, zero or more slots of the `swapchain` internal timing
results queue, equal to the number of entries written to
`VkPastPresentationTimingPropertiesEXT`::`pPresentationTimings` for
which `reportComplete` is [VK_TRUE](../fundamentals.html#VK_TRUE), are made available for future
`vkQueuePresentKHR` calls.
Elements of `pPresentationTimings` are arranged in ascending order of
present ids.

Timing information **may** become available out of order with regards to their
associated [vkQueuePresentKHR](#vkQueuePresentKHR) order.
[VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT) **can** be
set in `VkPastPresentationTimingInfoEXT`::`flags` to allow
`vkGetPastPresentationTimingEXT` to return results in that same order.
Otherwise, results are returned in the order of their associated
[vkQueuePresentKHR](#vkQueuePresentKHR) calls.

There is no requirement for any precise timing relationship between the
completion of a present stage and the availability of any associated timing
information.
However, results **must** be made available in finite time.

As an exception to the normal rules for objects which are externally
synchronized, `swapchain` **may** be simultaneously used by other threads
in calls to functions other than [vkDestroySwapchainKHR](#vkDestroySwapchainKHR) and
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR) with `swapchain` used as an
`oldSwapchain`.
Access to the swapchain timing information **must** be atomic within the
implementation.

Valid Usage

* 
[](#VUID-vkGetPastPresentationTimingEXT-flags-12230) VUID-vkGetPastPresentationTimingEXT-flags-12230

If [VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT)
is set in `VkPastPresentationTimingInfoEXT`::`flags`, the
`presentStageCount` value of each element of
`VkPastPresentationTimingPropertiesEXT`::`pPresentationTimings`
**must** be at least the maximum number of present stages set in
[VkPresentTimingInfoEXT](#VkPresentTimingInfoEXT)::`presentStageQueries` among all
[vkQueuePresentKHR](#vkQueuePresentKHR) calls, with a non-zero
`presentStageQueries`, for which complete results have not been
returned yet by a previous call

* 
[](#VUID-vkGetPastPresentationTimingEXT-flags-12231) VUID-vkGetPastPresentationTimingEXT-flags-12231

If [VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT)
is not set in `VkPastPresentationTimingInfoEXT`::`flags`, the
`presentStageCount` value of each element of
`VkPastPresentationTimingPropertiesEXT`::`pPresentationTimings`
**must** be at least the number of present stages set in
`VkPresentTimingInfoEXT`::`presentStageQueries` for the earliest
call to `vkQueuePresentKHR`, with a non-zero
`presentStageQueries`, that corresponds to that element’s index and
for which complete results have not been returned yet by a previous call

Valid Usage (Implicit)

* 
[](#VUID-vkGetPastPresentationTimingEXT-device-parameter) VUID-vkGetPastPresentationTimingEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingInfo-parameter) VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingInfo-parameter

 `pPastPresentationTimingInfo` **must** be a valid pointer to a valid [VkPastPresentationTimingInfoEXT](#VkPastPresentationTimingInfoEXT) structure

* 
[](#VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingProperties-parameter) VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingProperties-parameter

 `pPastPresentationTimingProperties` **must** be a valid pointer to a [VkPastPresentationTimingPropertiesEXT](#VkPastPresentationTimingPropertiesEXT) structure

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkPastPresentationTimingInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPastPresentationTimingInfoEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    VkPastPresentationTimingFlagsEXT    flags;
    VkSwapchainKHR                      swapchain;
} VkPastPresentationTimingInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPastPresentationTimingFlagBitsEXT](#VkPastPresentationTimingFlagBitsEXT)
specifying options for queries of past presentation timing information.

* 
`swapchain` is the swapchain to obtain presentation timing
information for.

Valid Usage (Implicit)

* 
[](#VUID-VkPastPresentationTimingInfoEXT-sType-sType) VUID-VkPastPresentationTimingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPastPresentationTimingInfoEXT-pNext-pNext) VUID-VkPastPresentationTimingInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPastPresentationTimingInfoEXT-flags-parameter) VUID-VkPastPresentationTimingInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkPastPresentationTimingFlagBitsEXT](#VkPastPresentationTimingFlagBitsEXT) values

* 
[](#VUID-VkPastPresentationTimingInfoEXT-swapchain-parameter) VUID-VkPastPresentationTimingInfoEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

// Provided by VK_EXT_present_timing
typedef VkFlags VkPastPresentationTimingFlagsEXT;

`VkPastPresentationTimingFlagsEXT` is a bitmask type for setting a mask
of zero or more [VkPastPresentationTimingFlagBitsEXT](#VkPastPresentationTimingFlagBitsEXT).

Bits which **can** be set in
[VkPastPresentationTimingInfoEXT](#VkPastPresentationTimingInfoEXT)::`flags`, specifying options for
queries of past presentation timing information, are:

// Provided by VK_EXT_present_timing
typedef enum VkPastPresentationTimingFlagBitsEXT {
    VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT = 0x00000001,
    VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT = 0x00000002,
} VkPastPresentationTimingFlagBitsEXT;

* 
[VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT)
specifies that [vkGetPastPresentationTimingEXT](#vkGetPastPresentationTimingEXT) **may** return partial
results for presentation requests that have not completed all requested
present stages.

* 
[VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT)
specifies that [vkGetPastPresentationTimingEXT](#vkGetPastPresentationTimingEXT) **may** return results
out of order with respect to the presentation order.

The `VkPastPresentationTimingPropertiesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPastPresentationTimingPropertiesEXT {
    VkStructureType                 sType;
    void*                           pNext;
    uint64_t                        timingPropertiesCounter;
    uint64_t                        timeDomainsCounter;
    uint32_t                        presentationTimingCount;
    VkPastPresentationTimingEXT*    pPresentationTimings;
} VkPastPresentationTimingPropertiesEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`timingPropertiesCounter` is a 64-bit unsigned integer set by the
implementation to the current value of the swapchain’s internal timing
properties counter.

* 
`timeDomainsCounter` is a 64-bit unsigned integer set by the
implementation to the current value of the swapchain’s internal time
domains list counter.

* 
`presentationTimingCount` is an integer related to the number of
[VkPastPresentationTimingEXT](#VkPastPresentationTimingEXT) structures available or queried, as
described below.

* 
`pPresentationTimings` is `NULL` or a pointer to an array of
[VkPastPresentationTimingEXT](#VkPastPresentationTimingEXT) structures.

When calling [vkGetPastPresentationTimingEXT](#vkGetPastPresentationTimingEXT), if
`pPresentationTimings` is `NULL`, then the number of available timing
records for the given `swapchain` is returned in
`presentationTimingCount`.
Otherwise, `presentationTimingCount` **must** specify the number of
elements in the `pPresentationTimings` array, and on return is
overwritten with the number of structures actually written to
`pPresentationTimings`.

if [VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT) is
specified in [VkPastPresentationTimingInfoEXT](#VkPastPresentationTimingInfoEXT)::`flags`,
`vkGetPastPresentationTimingEXT` **may** return incomplete results,
containing only information for a subset of the requested present stages.
Further calls to `vkGetPastPresentationTimingEXT` will keep providing
all available results for a previously incomplete entry until it is
complete.

The implementation **must** return a [VkPastPresentationTimingEXT](#VkPastPresentationTimingEXT) for
every [vkQueuePresentKHR](#vkQueuePresentKHR) referencing `swapchain` where a non-zero
[VkPresentTimingInfoEXT](#VkPresentTimingInfoEXT)::`presentStageQueries` was specified and at
least one present stage has available results.

Valid Usage (Implicit)

* 
[](#VUID-VkPastPresentationTimingPropertiesEXT-sType-sType) VUID-VkPastPresentationTimingPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_PROPERTIES_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPastPresentationTimingPropertiesEXT-pNext-pNext) VUID-VkPastPresentationTimingPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

|  | The presentation engine **may** change the timing properties of the
| --- | --- |
`swapchain` for a variety of reasons.

This **may** occur, for example, if the window system changes its mode,
including the refresh rate of the display.
Another example is if an application’s surface is being composited with
other windows of a window system, and then the surface’s window becomes a
borderless, full-screen window.
While composited, the timing properties **may** be FRR, and while full-screen,
the timing properties **may** be VRR.

The available time domains for a swapchain **may** change for similar or
identical reasons.
Therefore, it is possible that the same event will cause both the
swapchain’s internal timing properties counter and time domains list counter
to update. |

The `VkPastPresentationTimingEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPastPresentationTimingEXT {
    VkStructureType           sType;
    void*                     pNext;
    uint64_t                  presentId;
    uint64_t                  targetTime;
    uint32_t                  presentStageCount;
    VkPresentStageTimeEXT*    pPresentStages;
    VkTimeDomainKHR           timeDomain;
    uint64_t                  timeDomainId;
    VkBool32                  reportComplete;
} VkPastPresentationTimingEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentId` is zero or a value that was given to a previous
`vkQueuePresentKHR` command via
[VkPresentId2KHR](#VkPresentId2KHR)::`pPresentIds`.

* 
`targetTime` is the application-provided target absolute time or
duration of the associated presentation request in
[VkPresentTimingInfoEXT](#VkPresentTimingInfoEXT)::`targetTime`.

* 
`presentStageCount` is a count of items contained in
`pPresentStages`.

* 
`pPresentStages` a pointer to an array of
[VkPresentStageTimeEXT](#VkPresentStageTimeEXT) providing timing information for the
presentation request associated with `presentId`.

* 
`timeDomain` is the time domain used by the presentation engine to
report times in `pPresentStages`.

* 
`timeDomainId` is the id associated with `timeDomain`.

* 
`reportComplete` is [VK_TRUE](../fundamentals.html#VK_TRUE) if the presentation engine has
reported all the requested results in `pPresentStages`.

When calling [vkGetPastPresentationTimingEXT](#vkGetPastPresentationTimingEXT), the implementation sets
`presentStageCount` to the number of present stages it has written
results for.
If [VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT](#VkPastPresentationTimingFlagBitsEXT) was
specified in [VkPastPresentationTimingInfoEXT](#VkPastPresentationTimingInfoEXT)::`flags`, the
implementation **may** return an incomplete report containing fewer present
stage results than were queried by the associated presentation request.
Otherwise, results for all the present stages queried by the presentation
request are written by the implementation.

Timing information for some present stages **may** have a time value of 0,
indicating that results for that present stage are not available.

For systems with multiple entities operating within the presentation engine,
such as multiple displays, `pPresentStages` will return timing results
for one entity which has been affected by the presentation.

`timeDomainId` **may** be different than the time domain that was specified
in `VkPresentTimingInfoEXT`::`timeDomainId` if the requirements for
using this time domain could not be met at the time the presentation engine
processed the presentation request.
In such a case, the presentation engine **may** pick a time domain to fall back
to, if one is available, and report results in that domain.
Applications **can** continue to use this fallback time domain in future
`vkQueuePresentKHR` calls, or they **can** call
[vkGetSwapchainTimeDomainPropertiesEXT](#vkGetSwapchainTimeDomainPropertiesEXT) to choose from the currently
supported time domains.

Valid Usage (Implicit)

* 
[](#VUID-VkPastPresentationTimingEXT-sType-sType) VUID-VkPastPresentationTimingEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPastPresentationTimingEXT-pNext-pNext) VUID-VkPastPresentationTimingEXT-pNext-pNext

 `pNext` **must** be `NULL`

The `VkPresentStageTimeEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentStageTimeEXT {
    VkPresentStageFlagsEXT    stage;
    uint64_t                  time;
} VkPresentStageTimeEXT;

* 
`stage` is a [VkPresentStageFlagsEXT](#VkPresentStageFlagsEXT) value specifying a present
stage.

* 
`time` is a time in nanoseconds associated with the `stage`.

To query the duration of a refresh cycle (RC) for the presentation engine’s
display, call:

// Provided by VK_GOOGLE_display_timing
VkResult vkGetRefreshCycleDurationGOOGLE(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkRefreshCycleDurationGOOGLE*               pDisplayTimingProperties);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain the refresh duration for.

* 
`pDisplayTimingProperties` is a pointer to a
`VkRefreshCycleDurationGOOGLE` structure.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-device-parameter) VUID-vkGetRefreshCycleDurationGOOGLE-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parameter) VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-pDisplayTimingProperties-parameter) VUID-vkGetRefreshCycleDurationGOOGLE-pDisplayTimingProperties-parameter

 `pDisplayTimingProperties` **must** be a valid pointer to a [VkRefreshCycleDurationGOOGLE](#VkRefreshCycleDurationGOOGLE) structure

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parent) VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkRefreshCycleDurationGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkRefreshCycleDurationGOOGLE {
    uint64_t    refreshDuration;
} VkRefreshCycleDurationGOOGLE;

* 
`refreshDuration` is the number of nanoseconds from the start of one
refresh cycle to the next.

The implementation will maintain a limited amount of history of timing
information about previous presents.
Because of the asynchronous nature of the presentation engine, the timing
information for a given [vkQueuePresentKHR](#vkQueuePresentKHR) command will become
available some time later.
These time values can be asynchronously queried, and will be returned if
available.
All time values are in nanoseconds, relative to a monotonically-increasing
clock (e.g. `CLOCK_MONOTONIC` (see clock_gettime(2)) on Android and Linux).

To asynchronously query the presentation engine, for newly-available timing
information about one or more previous presents to a given swapchain, call:

// Provided by VK_GOOGLE_display_timing
VkResult vkGetPastPresentationTimingGOOGLE(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint32_t*                                   pPresentationTimingCount,
    VkPastPresentationTimingGOOGLE*             pPresentationTimings);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain presentation timing
information duration for.

* 
`pPresentationTimingCount` is a pointer to an integer related to the
number of `VkPastPresentationTimingGOOGLE` structures to query, as
described below.

* 
`pPresentationTimings` is either `NULL` or a pointer to an array of
`VkPastPresentationTimingGOOGLE` structures.

If `pPresentationTimings` is `NULL`, then the number of newly-available
timing records for the given `swapchain` is returned in
`pPresentationTimingCount`.
Otherwise, `pPresentationTimingCount` **must** point to a variable set by
the user to the number of elements in the `pPresentationTimings` array,
and on return the variable is overwritten with the number of structures
actually written to `pPresentationTimings`.
If the value of `pPresentationTimingCount` is less than the number of
newly-available timing records, at most `pPresentationTimingCount`
structures will be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead
of [VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available timing records
were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-device-parameter) VUID-vkGetPastPresentationTimingGOOGLE-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parameter) VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimingCount-parameter) VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimingCount-parameter

 `pPresentationTimingCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimings-parameter) VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimings-parameter

 If the value referenced by `pPresentationTimingCount` is not `0`, and `pPresentationTimings` is not `NULL`, `pPresentationTimings` **must** be a valid pointer to an array of `pPresentationTimingCount` [VkPastPresentationTimingGOOGLE](#VkPastPresentationTimingGOOGLE) structures

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parent) VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkPastPresentationTimingGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkPastPresentationTimingGOOGLE {
    uint32_t    presentID;
    uint64_t    desiredPresentTime;
    uint64_t    actualPresentTime;
    uint64_t    earliestPresentTime;
    uint64_t    presentMargin;
} VkPastPresentationTimingGOOGLE;

* 
`presentID` is an application-provided value that was given to a
previous `vkQueuePresentKHR` command via
[VkPresentTimeGOOGLE](#VkPresentTimeGOOGLE)::`presentID` (see below).
It **can** be used to uniquely identify a previous present with the
[vkQueuePresentKHR](#vkQueuePresentKHR) command.

* 
`desiredPresentTime` is an application-provided value that was given
to a previous [vkQueuePresentKHR](#vkQueuePresentKHR) command via
[VkPresentTimeGOOGLE](#VkPresentTimeGOOGLE)::`desiredPresentTime`.
If non-zero, it was used by the application to indicate that an image
not be presented any sooner than `desiredPresentTime`.

* 
`actualPresentTime` is the time when the image of the
`swapchain` was actually displayed.

* 
`earliestPresentTime` is the time when the image of the
`swapchain` could have been displayed.
This **may** differ from `actualPresentTime` if the application
requested that the image be presented no sooner than
[VkPresentTimeGOOGLE](#VkPresentTimeGOOGLE)::`desiredPresentTime`.

* 
`presentMargin` is an indication of how early the
`vkQueuePresentKHR` command was processed compared to how soon it
needed to be processed, and still be presented at
`earliestPresentTime`.

The results for a given `swapchain` and `presentID` are only
returned once from `vkGetPastPresentationTimingGOOGLE`.

The application **can** use the `VkPastPresentationTimingGOOGLE` values to
occasionally adjust its timing.
For example, if `actualPresentTime` is later than expected (e.g. one
`refreshDuration` late), the application may increase its target IPD to
a higher multiple of `refreshDuration` (e.g. decrease its frame rate
from 60Hz to 30Hz).
If `actualPresentTime` and `earliestPresentTime` are consistently
different, and if `presentMargin` is consistently large enough, the
application may decrease its target IPD to a smaller multiple of
`refreshDuration` (e.g. increase its frame rate from 30Hz to 60Hz).
If `actualPresentTime` and `earliestPresentTime` are same, and if
`presentMargin` is consistently high, the application may delay the
start of its input-render-present loop in order to decrease the latency
between user input and the corresponding present (always leaving some margin
in case a new image takes longer to render than the previous image).
An application that desires its target IPD to always be the same as
`refreshDuration`, can also adjust features until
`actualPresentTime` is never late and `presentMargin` is
satisfactory.

The full `[VK_GOOGLE_display_timing](../../appendices/extensions.html#VK_GOOGLE_display_timing)` extension semantics are described
for swapchains created with [VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR).
For example, non-zero values of
`VkPresentTimeGOOGLE`::`desiredPresentTime` **must** be honored, and
`vkGetPastPresentationTimingGOOGLE` **should** return a
`VkPastPresentationTimingGOOGLE` structure with valid values for all
images presented with `vkQueuePresentKHR`.
The semantics for other present modes are as follows:

* 
[VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR).
The presentation engine **may** ignore non-zero values of
`VkPresentTimeGOOGLE`::`desiredPresentTime` in favor of
presenting immediately.
The value of
`VkPastPresentationTimingGOOGLE`::`earliestPresentTime` **must** be
the same as
`VkPastPresentationTimingGOOGLE`::`actualPresentTime`, which
**should** be when the presentation engine displayed the image.

* 
[VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR).
The intention of using this present mode with this extension is to
handle cases where an image is presented late, and the next image is
presented soon enough to replace it at the next vertical blanking
period.
For images that are displayed to the user, the value of
`VkPastPresentationTimingGOOGLE`::`actualPresentTime` **must** be
when the image was displayed.
For images that are not displayed to the user,
`vkGetPastPresentationTimingGOOGLE` **may** not return a
`VkPastPresentationTimingGOOGLE` structure, or it **may** return a
`VkPastPresentationTimingGOOGLE` structure with the value of zero
for both `VkPastPresentationTimingGOOGLE`::`actualPresentTime`
and `VkPastPresentationTimingGOOGLE`::`earliestPresentTime`.
It is possible that an application **can** submit images with
`VkPresentTimeGOOGLE`::`desiredPresentTime` values such that new
images **may** not be displayed.
For example, if `VkPresentTimeGOOGLE`::`desiredPresentTime` is
far enough in the future that an image is not presented before
`vkQueuePresentKHR` is called to present another image, the first
image will not be displayed to the user.
If the application continues to do that, the presentation engine **may**
not display new images.

* 
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR).
For images that are presented in time to be displayed at the next
vertical blanking period, the semantics are identical as for
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR).
For images that are presented late, and are displayed after the start of
the vertical blanking period (i.e. with tearing), the values of
`VkPastPresentationTimingGOOGLE` **may** be treated as if the image was
displayed at the start of the vertical blanking period, or **may** be
treated the same as for [VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR).

Applications wanting to control the pacing of the application by monitoring
when presentation processes have completed to limit the number of
outstanding images queued for presentation, need to have a method of being
signaled during the presentation process.

Using the `[VK_GOOGLE_display_timing](../../appendices/extensions.html#VK_GOOGLE_display_timing)` extension, applications can
discover when images were presented, but only asynchronously.

Providing a mechanism which allows applications to block, waiting for a
specific step of the presentation process to complete allows them to control
the amount of outstanding work (and hence the potential lag in responding to
user input or changes in the rendering environment).

The `[VK_KHR_present_wait2](../../appendices/extensions.html#VK_KHR_present_wait2)` extension allows applications to tell the
presentation engine at the [vkQueuePresentKHR](#vkQueuePresentKHR) call that it plans on
waiting for presentation by passing a [VkPresentId2KHR](#VkPresentId2KHR) structure.
The `presentId` passed in that structure may then be passed to a future
[vkWaitForPresent2KHR](#vkWaitForPresent2KHR) call to cause the application to block until that
presentation is finished.

This functionality was originally provided by the
`[VK_KHR_present_wait](../../appendices/extensions.html#VK_KHR_present_wait)` extension, which has been deprecated and
replaced by `[VK_KHR_present_wait2](../../appendices/extensions.html#VK_KHR_present_wait2)`.

The `VkPresentWait2InfoKHR` structure is defined as:

// Provided by VK_KHR_present_wait2
typedef struct VkPresentWait2InfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           presentId;
    uint64_t           timeout;
} VkPresentWait2InfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentId` is the presentation presentId to wait for.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

Valid Usage (Implicit)

* 
[](#VUID-VkPresentWait2InfoKHR-sType-sType) VUID-VkPresentWait2InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_WAIT_2_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentWait2InfoKHR-pNext-pNext) VUID-VkPresentWait2InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

A swapchain object (a.k.a.
swapchain) provides the ability to present rendering results to a surface.
Swapchain objects are represented by `VkSwapchainKHR` handles:

// Provided by VK_KHR_swapchain
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSwapchainKHR)

A swapchain is an abstraction for an array of presentable images that are
associated with a surface.
The presentable images are represented by `VkImage` objects created by
the platform.
One image (which **can** be an array image for multiview/stereoscopic-3D
surfaces) is displayed at a time, but multiple images **can** be queued for
presentation.
An application renders to the image, and then queues the image for
presentation to the surface.

A native window **cannot** be associated with more than one non-retired
swapchain at a time.
Further, swapchains **cannot** be created for native windows that have a
non-Vulkan graphics API surface associated with them.

|  | The presentation engine is an abstraction for the platform’s compositor or
| --- | --- |
display engine.

The presentation engine **may** be synchronous or asynchronous with respect to
the application and/or logical device.

Some implementations **may** use the device’s graphics queue or dedicated
presentation hardware to perform presentation. |

The presentable images of a swapchain are owned by the presentation engine.
An application **can** acquire use of a presentable image from the presentation
engine.
Use of a presentable image **must** occur only after the image is returned by
[vkAcquireNextImageKHR](#vkAcquireNextImageKHR), and before it is released by
[vkQueuePresentKHR](#vkQueuePresentKHR).
This includes transitioning the image layout and rendering commands.

An application **can** acquire use of a presentable image with
[vkAcquireNextImageKHR](#vkAcquireNextImageKHR).
After acquiring a presentable image and before modifying it, the application
**must** use a synchronization primitive to ensure that the presentation engine
has finished reading from the image.
The application **can** then transition the image’s layout, queue rendering
commands to it, etc.
Finally, the application presents the image with [vkQueuePresentKHR](#vkQueuePresentKHR),
which releases the acquisition of the image.
The application **can** also release the acquisition of the image through
[vkReleaseSwapchainImagesKHR](#vkReleaseSwapchainImagesKHR), if the image is not in use by the device,
and skip the present operation.

The presentation engine controls the order in which presentable images are
acquired for use by the application.

|  | This allows the platform to handle situations which require out-of-order
| --- | --- |
return of images after presentation.
At the same time, it allows the application to generate command buffers
referencing all of the images in the swapchain at initialization time,
rather than in its main loop. |

How this all works is described below.

If a swapchain is created with `presentMode` set to either
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR), a single presentable
image **can** be acquired, referred to as a shared presentable image.
A shared presentable image **may** be concurrently accessed by the application
and the presentation engine, without transitioning the image’s layout after
it is initially presented.

* 
With [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR), the presentation
engine is only required to update to the latest contents of a shared
presentable image after a present.
The application **must** call `vkQueuePresentKHR` to guarantee an
update.
However, the presentation engine **may** update from it at any time.

* 
With [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR), the
presentation engine will automatically present the latest contents of a
shared presentable image during every refresh cycle.
The application is only required to make one initial call to
`vkQueuePresentKHR`, after which the presentation engine will update
from it without any need for further present calls.
The application **can** indicate the image contents have been updated by
calling `vkQueuePresentKHR`, but this does not guarantee the timing
of when updates will occur.

The presentation engine **may** access a shared presentable image at any time
after it is first presented.
To avoid tearing, an application **should** coordinate access with the
presentation engine.
This requires presentation engine timing information through
platform-specific mechanisms and ensuring that color attachment writes are
made available during the portion of the presentation engine’s refresh cycle
they are intended for.

|  | The `[VK_KHR_shared_presentable_image](../../appendices/extensions.html#VK_KHR_shared_presentable_image)` extension does not provide
| --- | --- |
functionality for determining the timing of the presentation engine’s
refresh cycles. |

In order to query a swapchain’s status when rendering to a shared
presentable image, call:

// Provided by VK_KHR_shared_presentable_image
VkResult vkGetSwapchainStatusKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to query.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainStatusKHR-device-parameter) VUID-vkGetSwapchainStatusKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSwapchainStatusKHR-swapchain-parameter) VUID-vkGetSwapchainStatusKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetSwapchainStatusKHR-swapchain-parent) VUID-vkGetSwapchainStatusKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The possible return values for `vkGetSwapchainStatusKHR` **should** be
interpreted as follows:

* 
[VK_SUCCESS](../fundamentals.html#VkResult) specifies the presentation engine is presenting the
contents of the shared presentable image, as per the swapchain’s
[VkPresentModeKHR](#VkPresentModeKHR).

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) the swapchain no longer matches the surface
properties exactly, but the presentation engine is presenting the
contents of the shared presentable image, as per the swapchain’s
[VkPresentModeKHR](#VkPresentModeKHR).

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) the surface has changed in such a way
that it is no longer compatible with the swapchain.

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult) the surface is no longer available.

|  | The swapchain state **may** be cached by implementations, so applications
| --- | --- |
**should** regularly call `vkGetSwapchainStatusKHR` when using a swapchain
with [VkPresentModeKHR](#VkPresentModeKHR) equal to
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR). |

To create a swapchain, call:

// Provided by VK_KHR_swapchain
VkResult vkCreateSwapchainKHR(
    VkDevice                                    device,
    const VkSwapchainCreateInfoKHR*             pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSwapchainKHR*                             pSwapchain);

* 
`device` is the device to create the swapchain for.

* 
`pCreateInfo` is a pointer to a [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)
structure specifying the parameters of the created swapchain.

* 
`pAllocator` is the allocator used for host memory allocated for the
swapchain object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

* 
`pSwapchain` is a pointer to a [VkSwapchainKHR](#VkSwapchainKHR) handle in which
the created swapchain object will be returned.

As mentioned above, if `vkCreateSwapchainKHR` succeeds, it will return a
handle to a swapchain containing an array of at least
`pCreateInfo->minImageCount` presentable images.

While acquired by the application, presentable images **can** be used in any
way that equivalent non-presentable images **can** be used.
A presentable image is equivalent to a non-presentable image created with
the following [VkImageCreateInfo](../resources.html#VkImageCreateInfo) parameters:

| `VkImageCreateInfo` Field | Value |
| --- | --- |
| `flags` | [VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](../resources.html#VkImageCreateFlagBits) is set if
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) is set
[VK_IMAGE_CREATE_PROTECTED_BIT](../resources.html#VkImageCreateFlagBits) is set if
[VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) is set
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](../resources.html#VkImageCreateFlagBits) and
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT_KHR](../resources.html#VkImageCreateFlagBits) are both set if
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) is set
all other bits are unset |
| `imageType` | [VK_IMAGE_TYPE_2D](../resources.html#VkImageType) |
| `format` | `pCreateInfo->imageFormat` |
| `extent` | {`pCreateInfo->imageExtent.width`, `pCreateInfo->imageExtent.height`, `1`} |
| `mipLevels` | 1 |
| `arrayLayers` | `pCreateInfo->imageArrayLayers` |
| `samples` | [VK_SAMPLE_COUNT_1_BIT](../limits.html#VkSampleCountFlagBits) |
| `tiling` | [VK_IMAGE_TILING_OPTIMAL](../resources.html#VkImageTiling) |
| `usage` | `pCreateInfo->imageUsage` |
| `sharingMode` | `pCreateInfo->imageSharingMode` |
| `queueFamilyIndexCount` | `pCreateInfo->queueFamilyIndexCount` |
| `pQueueFamilyIndices` | `pCreateInfo->pQueueFamilyIndices` |
| `initialLayout` | [VK_IMAGE_LAYOUT_UNDEFINED](../resources.html#VkImageLayout) |

The `pCreateInfo->surface` **must** not be destroyed until after the
swapchain is destroyed.

If `oldSwapchain` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and
the native window referred to by `pCreateInfo->surface` is already
associated with a Vulkan swapchain, [VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)
**must** be returned.

If `oldSwapchain` is a valid swapchain and there are outstanding calls
to `vkWaitForPresent2KHR`, then `vkCreateSwapchainKHR` **may** block
until those calls complete.

If the native window referred to by `pCreateInfo->surface` is already
associated with a non-Vulkan graphics API surface,
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult) **must** be returned.

The native window referred to by `pCreateInfo->surface` **must** not become
associated with a non-Vulkan graphics API surface before all associated
Vulkan swapchains have been destroyed.

`vkCreateSwapchainKHR` will return [VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult) if the
logical device was lost.
The `VkSwapchainKHR` is a child of the `device`, and **must** be
destroyed before the `device`.
However, `VkSurfaceKHR` is not a child of any `VkDevice` and is not
affected by the lost device.
After successfully recreating a `VkDevice`, the same `VkSurfaceKHR`
**can** be used to create a new `VkSwapchainKHR`, provided the previous one
was destroyed.

If the `oldSwapchain` parameter of `pCreateInfo` is a valid
swapchain, which has exclusive full-screen access, that access is released
from `pCreateInfo->oldSwapchain`.
If the command succeeds in this case, the newly created swapchain will
automatically acquire exclusive full-screen access from
`pCreateInfo->oldSwapchain`.

|  | This implicit transfer is intended to avoid exiting and entering full-screen
| --- | --- |
exclusive mode, which may otherwise cause unwanted visual updates to the
display. |

In some cases, swapchain creation **may** fail if exclusive full-screen mode is
requested for application control, but for some implementation-specific
reason exclusive full-screen access is unavailable for the particular
combination of parameters provided.
If this occurs, [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult) will be returned.

|  | In particular, it will fail if the `imageExtent` member of
| --- | --- |
`pCreateInfo` does not match the extents of the monitor.
Other reasons for failure may include the application not being set as
high-dpi aware, or if the physical device and monitor are not compatible in
this mode. |

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) includes a
[VkSwapchainPresentBarrierCreateInfoNV](#VkSwapchainPresentBarrierCreateInfoNV) structure, then that structure
includes additional swapchain creation parameters specific to the present
barrier.
Swapchain creation **may** fail if the state of the current system restricts
the usage of the present barrier feature
[VkSurfaceCapabilitiesPresentBarrierNV](#VkSurfaceCapabilitiesPresentBarrierNV), or a swapchain itself does not
satisfy all the required conditions.
In this scenario [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult) is returned.

When the [VkSurfaceKHR](#VkSurfaceKHR) in [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) is a display
surface, then the [VkDisplayModeKHR](#VkDisplayModeKHR) in display surface’s
[VkDisplaySurfaceCreateInfoKHR](#VkDisplaySurfaceCreateInfoKHR) is associated with a particular
[VkDisplayKHR](#VkDisplayKHR).
Swapchain creation **may** fail if that [VkDisplayKHR](#VkDisplayKHR) is not acquired by
the application.
In this scenario [VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult) is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSwapchainKHR-device-parameter) VUID-vkCreateSwapchainKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateSwapchainKHR-pCreateInfo-parameter) VUID-vkCreateSwapchainKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure

* 
[](#VUID-vkCreateSwapchainKHR-pAllocator-parameter) VUID-vkCreateSwapchainKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateSwapchainKHR-pSwapchain-parameter) VUID-vkCreateSwapchainKHR-pSwapchain-parameter

 `pSwapchain` **must** be a valid pointer to a [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkCreateSwapchainKHR-device-queuecount) VUID-vkCreateSwapchainKHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkSwapchainCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain
typedef struct VkSwapchainCreateInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSwapchainCreateFlagsKHR        flags;
    VkSurfaceKHR                     surface;
    uint32_t                         minImageCount;
    VkFormat                         imageFormat;
    VkColorSpaceKHR                  imageColorSpace;
    VkExtent2D                       imageExtent;
    uint32_t                         imageArrayLayers;
    VkImageUsageFlags                imageUsage;
    VkSharingMode                    imageSharingMode;
    uint32_t                         queueFamilyIndexCount;
    const uint32_t*                  pQueueFamilyIndices;
    VkSurfaceTransformFlagBitsKHR    preTransform;
    VkCompositeAlphaFlagBitsKHR      compositeAlpha;
    VkPresentModeKHR                 presentMode;
    VkBool32                         clipped;
    VkSwapchainKHR                   oldSwapchain;
} VkSwapchainCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSwapchainCreateFlagBitsKHR](#VkSwapchainCreateFlagBitsKHR)
indicating parameters of the swapchain creation.

* 
`surface` is the surface onto which the swapchain will present
images.
If the creation succeeds, the swapchain becomes associated with
`surface`.

* 
`minImageCount` is the minimum number of presentable images that the
application needs.
The implementation will either create the swapchain with at least that
many images, or it will fail to create the swapchain.

* 
`imageFormat` is a [VkFormat](../formats.html#VkFormat) value specifying the format the
swapchain image(s) will be created with.

* 
`imageColorSpace` is a [VkColorSpaceKHR](#VkColorSpaceKHR) value specifying the
way the swapchain interprets image data.

* 
`imageExtent` is the size (in pixels) of the swapchain image(s).
The behavior is platform-dependent if the image extent does not match
the surface’s `currentExtent` as returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR`.

|  | On some platforms, it is normal that `maxImageExtent` **may** become `(0,
| --- | --- |
0)`, for example when the window is minimized.
In such a case, it is not possible to create a swapchain due to the Valid
Usage requirements
, unless scaling is selected through
[VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR), if supported
. |

* 
`imageArrayLayers` is the number of views in a multiview/stereo
surface.
For non-stereoscopic-3D applications, this value is 1.

* 
`imageUsage` is a bitmask of [VkImageUsageFlagBits](../resources.html#VkImageUsageFlagBits) describing
the intended usage of the (acquired) swapchain images.

* 
`imageSharingMode` is the sharing mode used for the image(s) of the
swapchain.

* 
`queueFamilyIndexCount` is the number of queue families having
access to the image(s) of the swapchain when `imageSharingMode` is
[VK_SHARING_MODE_CONCURRENT](../resources.html#VkSharingMode).

* 
`pQueueFamilyIndices` is a pointer to an array of queue family
indices having access to the images(s) of the swapchain when
`imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](../resources.html#VkSharingMode).

* 
`preTransform` is a [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) value
describing the transform, relative to the presentation engine’s natural
orientation, applied to the image content prior to presentation.
If it does not match the `currentTransform` value returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR`, the presentation engine
will transform the image content as part of the presentation operation.

* 
`compositeAlpha` is a [VkCompositeAlphaFlagBitsKHR](#VkCompositeAlphaFlagBitsKHR) value
indicating the alpha compositing mode to use when this surface is
composited together with other surfaces on certain window systems.

* 
`presentMode` is the presentation mode the swapchain will use.
A swapchain’s present mode determines how incoming present requests will
be processed and queued internally.

* 
`clipped` specifies whether the Vulkan implementation is allowed to
discard rendering operations that affect regions of the surface that are
not visible.

If `clipped` is [VK_TRUE](../fundamentals.html#VK_TRUE), the presentable images associated
with the swapchain **may** not own all of their pixels.
Pixels in the presentable images that correspond to regions of the
target surface obscured by another window on the desktop, or subject to
some other clipping mechanism will have **undefined** content when read
back.
Fragment shaders **may** not execute for these pixels, and thus any side
effects they would have had will not occur.
Setting [VK_TRUE](../fundamentals.html#VK_TRUE) does not guarantee any clipping will occur, but
allows more efficient presentation methods to be used on some
platforms.

* 
If `clipped` is [VK_FALSE](../fundamentals.html#VK_FALSE), presentable images associated with
the swapchain will own all of the pixels they contain.

|  | Applications **should** set this value to [VK_TRUE](../fundamentals.html#VK_TRUE) if they do not expect
| --- | --- |
to read back the content of presentable images before presenting them or
after reacquiring them, and if their fragment shaders do not have any side
effects that require them to run for all pixels in the presentable image. |

`oldSwapchain` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), or the existing non-retired
swapchain currently associated with `surface`.
Providing a valid `oldSwapchain` **may** aid in the resource reuse, and
also allows the application to still present any images that are already
acquired from it.

Upon calling `vkCreateSwapchainKHR` with an `oldSwapchain` that is
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `oldSwapchain` is retired — even if creation
of the new swapchain fails.
The new swapchain is created in the non-retired state whether or not
`oldSwapchain` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE).

Upon calling `vkCreateSwapchainKHR` with an `oldSwapchain` that is
not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), any images from `oldSwapchain` that are not
acquired by the application **may** be freed by the implementation, which **may**
occur even if creation of the new swapchain fails.
The application **can** destroy `oldSwapchain` to free all memory
associated with `oldSwapchain`.

|  | Multiple retired swapchains **can** be associated with the same
| --- | --- |
`VkSurfaceKHR` through multiple uses of `oldSwapchain` that
outnumber calls to [vkDestroySwapchainKHR](#vkDestroySwapchainKHR).

After `oldSwapchain` is retired, the application **can** pass to
[vkQueuePresentKHR](#vkQueuePresentKHR) any images it had already acquired from
`oldSwapchain`.
E.g., an application may present an image from the old swapchain before an
image from the new swapchain is ready to be presented.
As usual, [vkQueuePresentKHR](#vkQueuePresentKHR) **may** fail if `oldSwapchain` has
entered a state that causes [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) to be returned.

The application **can** continue to use a shared presentable image obtained
from `oldSwapchain` until a presentable image is acquired from the new
swapchain, as long as it has not entered a state that causes it to return
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult). |

Valid Usage

* 
[](#VUID-VkSwapchainCreateInfoKHR-surface-01270) VUID-VkSwapchainCreateInfoKHR-surface-01270

`surface` **must** be a surface that is supported by the device as
determined using [vkGetPhysicalDeviceSurfaceSupportKHR](#vkGetPhysicalDeviceSurfaceSupportKHR)

* 
[](#VUID-VkSwapchainCreateInfoKHR-minImageCount-01272) VUID-VkSwapchainCreateInfoKHR-minImageCount-01272

`minImageCount` **must** be less than or equal to the value returned in
the `maxImageCount` member of the `VkSurfaceCapabilitiesKHR`
structure returned by `vkGetPhysicalDeviceSurfaceCapabilitiesKHR`
for the surface if the returned `maxImageCount` is not zero

* 
[](#VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10155) VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10155

If the [`swapchainMaintenance1`](../features.html#features-swapchainMaintenance1)
feature is not enabled, then the `pNext` chain **must** not include a
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR) structure

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-02839) VUID-VkSwapchainCreateInfoKHR-presentMode-02839

If `presentMode` is not
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) nor
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR), then
`minImageCount` **must** be greater than or equal to the value returned
in the `minImageCount` member of the `VkSurfaceCapabilitiesKHR`
structure returned by [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](#vkGetPhysicalDeviceSurfaceCapabilitiesKHR)
for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-minImageCount-01383) VUID-VkSwapchainCreateInfoKHR-minImageCount-01383

`minImageCount` **must** be `1` if `presentMode` is either
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR)

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageFormat-01273) VUID-VkSwapchainCreateInfoKHR-imageFormat-01273

`imageFormat` and `imageColorSpace` **must** match the `format`
and `colorSpace` members, respectively, of one of the
`VkSurfaceFormatKHR` structures returned by
`vkGetPhysicalDeviceSurfaceFormatsKHR` for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-07781) VUID-VkSwapchainCreateInfoKHR-pNext-07781

If a [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR) structure was not
included in the `pNext` chain, or it is included and
[VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR)::`scalingBehavior` is
zero then
`imageExtent` **must** be between `minImageExtent` and
`maxImageExtent`, inclusive, where `minImageExtent` and
`maxImageExtent` are members of the `VkSurfaceCapabilitiesKHR`
structure returned by `vkGetPhysicalDeviceSurfaceCapabilitiesKHR`
for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-07782) VUID-VkSwapchainCreateInfoKHR-pNext-07782

If a [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR) structure was included
in the `pNext` chain and
[VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR)::`scalingBehavior` is
not zero then `imageExtent` **must** be between
`minScaledImageExtent` and `maxScaledImageExtent`, inclusive,
where `minScaledImageExtent` and `maxScaledImageExtent` are
members of the `VkSurfacePresentScalingCapabilitiesKHR` structure
returned by `vkGetPhysicalDeviceSurfaceCapabilities2KHR` for the
surface and `presentMode`

* 
[](#VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10157) VUID-VkSwapchainCreateInfoKHR-swapchainMaintenance1-10157

If the [`swapchainMaintenance1`](../features.html#features-swapchainMaintenance1)
feature is not enabled, then `flags` **must** not include
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#VkSwapchainCreateFlagBitsKHR)

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageExtent-01689) VUID-VkSwapchainCreateInfoKHR-imageExtent-01689

`imageExtent` members `width` and `height` **must** both be
non-zero

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageArrayLayers-01275) VUID-VkSwapchainCreateInfoKHR-imageArrayLayers-01275

`imageArrayLayers` **must** be greater than `0` and less than or equal
to the `maxImageArrayLayers` member of the
`VkSurfaceCapabilitiesKHR` structure returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR` for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-01427) VUID-VkSwapchainCreateInfoKHR-presentMode-01427

If `presentMode` is
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR), [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR), `imageUsage` **must** be a
subset of the supported usage flags present in the
`supportedUsageFlags` member of the [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)
structure returned by [vkGetPhysicalDeviceSurfaceCapabilitiesKHR](#vkGetPhysicalDeviceSurfaceCapabilitiesKHR)
for `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageUsage-01384) VUID-VkSwapchainCreateInfoKHR-imageUsage-01384

If `presentMode` is [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR)
or [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR), `imageUsage`
**must** be a subset of the supported usage flags present in the
`sharedPresentSupportedUsageFlags` member of the
[VkSharedPresentSurfaceCapabilitiesKHR](#VkSharedPresentSurfaceCapabilitiesKHR) structure returned by
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR) for `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01277) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01277

If `imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](../resources.html#VkSharingMode),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01278) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01278

If `imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](../resources.html#VkSharingMode),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01428) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-01428

If `imageSharingMode` is [VK_SHARING_MODE_CONCURRENT](../resources.html#VkSharingMode), each
element of `pQueueFamilyIndices` **must** be unique and **must** be less
than `pQueueFamilyPropertyCount` returned by either
[vkGetPhysicalDeviceQueueFamilyProperties](../devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties)
or [vkGetPhysicalDeviceQueueFamilyProperties2](../devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2)
for the `physicalDevice` that was used to create `device`

* 
[](#VUID-VkSwapchainCreateInfoKHR-preTransform-01279) VUID-VkSwapchainCreateInfoKHR-preTransform-01279

`preTransform` **must** be one of the bits present in the
`supportedTransforms` member of the `VkSurfaceCapabilitiesKHR`
structure returned by `vkGetPhysicalDeviceSurfaceCapabilitiesKHR`
for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-compositeAlpha-01280) VUID-VkSwapchainCreateInfoKHR-compositeAlpha-01280

`compositeAlpha` **must** be one of the bits present in the
`supportedCompositeAlpha` member of the
`VkSurfaceCapabilitiesKHR` structure returned by
`vkGetPhysicalDeviceSurfaceCapabilitiesKHR` for the surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-01281) VUID-VkSwapchainCreateInfoKHR-presentMode-01281

`presentMode` **must** be one of the [VkPresentModeKHR](#VkPresentModeKHR) values
returned by `vkGetPhysicalDeviceSurfacePresentModesKHR` for the
surface

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentModeFifoLatestReady-10161) VUID-VkSwapchainCreateInfoKHR-presentModeFifoLatestReady-10161

If the [    `presentModeFifoLatestReady`](../features.html#features-presentModeFifoLatestReady) feature is not enabled,
`presentMode` **must** not be
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR)

* 
[](#VUID-VkSwapchainCreateInfoKHR-physicalDeviceCount-01429) VUID-VkSwapchainCreateInfoKHR-physicalDeviceCount-01429

If the logical device was created with
[VkDeviceGroupDeviceCreateInfo](../devsandqueues.html#VkDeviceGroupDeviceCreateInfo)::`physicalDeviceCount` equal to
1,
`flags` **must** not contain
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](#VkSwapchainCreateFlagBitsKHR)

* 
[](#VUID-VkSwapchainCreateInfoKHR-oldSwapchain-01933) VUID-VkSwapchainCreateInfoKHR-oldSwapchain-01933

If `oldSwapchain` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `oldSwapchain`
**must** be a non-retired swapchain associated with native window referred
to by `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageFormat-01778) VUID-VkSwapchainCreateInfoKHR-imageFormat-01778

The [implied image creation    parameters](#swapchain-wsi-image-create-info) of the swapchain **must** be supported as reported by
[vkGetPhysicalDeviceImageFormatProperties](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties)

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-03168) VUID-VkSwapchainCreateInfoKHR-flags-03168

If `flags` contains [VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](#VkSwapchainCreateFlagBitsKHR)
then the `pNext` chain **must** include a
[VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo) structure with a `viewFormatCount`
greater than zero and `pViewFormats` **must** have an element equal to
`imageFormat`

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-04099) VUID-VkSwapchainCreateInfoKHR-pNext-04099

If a [VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo) structure was included in the
`pNext` chain and
[VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo)::`viewFormatCount` is not zero
then all of the formats in
[VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo)::`pViewFormats` **must** be
compatible with the `format` as described in the
[compatibility table](../formats.html#formats-compatibility)

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-04100) VUID-VkSwapchainCreateInfoKHR-flags-04100

If `flags` does not contain
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) and the `pNext`
chain include a [VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo) structure then
[VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo)::`viewFormatCount` **must** be `0` or
`1`

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-03187) VUID-VkSwapchainCreateInfoKHR-flags-03187

If `flags` contains [VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](#VkSwapchainCreateFlagBitsKHR),
then `VkSurfaceProtectedCapabilitiesKHR`::`supportsProtected`
**must** be [VK_TRUE](../fundamentals.html#VK_TRUE) in the [VkSurfaceProtectedCapabilitiesKHR](#VkSurfaceProtectedCapabilitiesKHR)
structure returned by [vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR)
for `surface`

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-02679) VUID-VkSwapchainCreateInfoKHR-pNext-02679

If the `pNext` chain includes a
[VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT) structure with its
`fullScreenExclusive` member set to
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT), and
`surface` was created using [vkCreateWin32SurfaceKHR](#vkCreateWin32SurfaceKHR), a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](#VkSurfaceFullScreenExclusiveWin32InfoEXT) structure **must** be
included in the `pNext` chain

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-06752) VUID-VkSwapchainCreateInfoKHR-pNext-06752

If the [    `imageCompressionControlSwapchain`](../features.html#features-imageCompressionControlSwapchain) feature is not enabled, the
`pNext` chain **must** not include an
[VkImageCompressionControlEXT](../resources.html#VkImageCompressionControlEXT) structure

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentTiming-12232) VUID-VkSwapchainCreateInfoKHR-presentTiming-12232

If none of the [`presentTiming`](../features.html#features-presentTiming),
[`presentAtAbsoluteTime`](../features.html#features-presentAtAbsoluteTime), or
[`presentAtRelativeTime`](../features.html#features-presentAtRelativeTime) features
are enabled, `flags` **must** not contain
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](#VkSwapchainCreateFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainCreateInfoKHR-sType-sType) VUID-VkSwapchainCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainCreateInfoKHR-pNext-pNext) VUID-VkSwapchainCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupSwapchainCreateInfoKHR](#VkDeviceGroupSwapchainCreateInfoKHR), [VkImageCompressionControlEXT](../resources.html#VkImageCompressionControlEXT), [VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo), [VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT), [VkSurfaceFullScreenExclusiveWin32InfoEXT](#VkSurfaceFullScreenExclusiveWin32InfoEXT), [VkSwapchainCounterCreateInfoEXT](#VkSwapchainCounterCreateInfoEXT), [VkSwapchainDisplayNativeHdrCreateInfoAMD](#VkSwapchainDisplayNativeHdrCreateInfoAMD), [VkSwapchainLatencyCreateInfoNV](#VkSwapchainLatencyCreateInfoNV), [VkSwapchainPresentBarrierCreateInfoNV](#VkSwapchainPresentBarrierCreateInfoNV), [VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR), or [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR)

* 
[](#VUID-VkSwapchainCreateInfoKHR-sType-unique) VUID-VkSwapchainCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSwapchainCreateInfoKHR-flags-parameter) VUID-VkSwapchainCreateInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkSwapchainCreateFlagBitsKHR](#VkSwapchainCreateFlagBitsKHR) values

* 
[](#VUID-VkSwapchainCreateInfoKHR-surface-parameter) VUID-VkSwapchainCreateInfoKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](#VkSurfaceKHR) handle

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageFormat-parameter) VUID-VkSwapchainCreateInfoKHR-imageFormat-parameter

 `imageFormat` **must** be a valid [VkFormat](../formats.html#VkFormat) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageColorSpace-parameter) VUID-VkSwapchainCreateInfoKHR-imageColorSpace-parameter

 `imageColorSpace` **must** be a valid [VkColorSpaceKHR](#VkColorSpaceKHR) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageUsage-parameter) VUID-VkSwapchainCreateInfoKHR-imageUsage-parameter

 `imageUsage` **must** be a valid combination of [VkImageUsageFlagBits](../resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageUsage-requiredbitmask) VUID-VkSwapchainCreateInfoKHR-imageUsage-requiredbitmask

 `imageUsage` **must** not be `0`

* 
[](#VUID-VkSwapchainCreateInfoKHR-imageSharingMode-parameter) VUID-VkSwapchainCreateInfoKHR-imageSharingMode-parameter

 `imageSharingMode` **must** be a valid [VkSharingMode](../resources.html#VkSharingMode) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-preTransform-parameter) VUID-VkSwapchainCreateInfoKHR-preTransform-parameter

 `preTransform` **must** be a valid [VkSurfaceTransformFlagBitsKHR](#VkSurfaceTransformFlagBitsKHR) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-compositeAlpha-parameter) VUID-VkSwapchainCreateInfoKHR-compositeAlpha-parameter

 `compositeAlpha` **must** be a valid [VkCompositeAlphaFlagBitsKHR](#VkCompositeAlphaFlagBitsKHR) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-presentMode-parameter) VUID-VkSwapchainCreateInfoKHR-presentMode-parameter

 `presentMode` **must** be a valid [VkPresentModeKHR](#VkPresentModeKHR) value

* 
[](#VUID-VkSwapchainCreateInfoKHR-oldSwapchain-parameter) VUID-VkSwapchainCreateInfoKHR-oldSwapchain-parameter

 If `oldSwapchain` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `oldSwapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-VkSwapchainCreateInfoKHR-commonparent) VUID-VkSwapchainCreateInfoKHR-commonparent

 Both of `oldSwapchain`, and `surface` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkInstance](../initialization.html#VkInstance)

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

* 
Host access to `oldSwapchain` **must** be externally synchronized

Bits which **can** be set in [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`flags`,
specifying parameters of swapchain creation, are:

// Provided by VK_KHR_swapchain
typedef enum VkSwapchainCreateFlagBitsKHR {
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR = 0x00000001,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain
    VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_swapchain_mutable_format
    VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR = 0x00000004,
  // Provided by VK_EXT_present_timing
    VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT = 0x00000200,
  // Provided by VK_KHR_present_id2
    VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR = 0x00000040,
  // Provided by VK_KHR_present_wait2
    VK_SWAPCHAIN_CREATE_PRESENT_WAIT_2_BIT_KHR = 0x00000080,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR = 0x00000008,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_EXT = VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR,
} VkSwapchainCreateFlagBitsKHR;

* 
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) specifies
that images created from the swapchain (i.e. with the `swapchain`
member of [VkImageSwapchainCreateInfoKHR](../resources.html#VkImageSwapchainCreateInfoKHR) set to this swapchain’s
handle) **must** use [VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](../resources.html#VkImageCreateFlagBits).

* 
[VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) specifies that images
created from the swapchain are protected images.

* 
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) specifies that the
images of the swapchain **can** be used to create a `VkImageView` with
a different format than what the swapchain was created with.
The list of allowed image view formats is specified by adding a
[VkImageFormatListCreateInfo](../resources.html#VkImageFormatListCreateInfo) structure to the `pNext` chain of
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR).
In addition, this flag also specifies that the swapchain **can** be created
with usage flags that are not supported for the format the swapchain is
created with but are supported for at least one of the allowed image
view formats.

* 
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) specifies
    that the implementation **may** defer allocation of memory associated with
    each swapchain image until its index is to be returned from
    [vkAcquireNextImageKHR](#vkAcquireNextImageKHR)
or [vkAcquireNextImage2KHR](#vkAcquireNextImage2KHR)
    for the first time.

* 
[VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) specifies that
applications **can** include the `VkPresentId2KHR` structure in the
`pNext` chain of the [VkPresentInfoKHR](#VkPresentInfoKHR) structure to associate
an identifier with each presentation request.

* 
[VK_SWAPCHAIN_CREATE_PRESENT_WAIT_2_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) specifies that
applications **can** use `vkWaitForPresent2KHR` to wait for the
presentation engine to have begun presentation of the presentation
request associated with [VkPresentWait2InfoKHR](#VkPresentWait2InfoKHR)::`presentId` on
`swapchain`.

* 
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](#VkSwapchainCreateFlagBitsKHR) specifies that features
supported by the swapchain device in
[VkPhysicalDevicePresentTimingFeaturesEXT](../features.html#VkPhysicalDevicePresentTimingFeaturesEXT) **can** be used to collect
timing information or schedule presentation requests at specific times.

// Provided by VK_KHR_swapchain
typedef VkFlags VkSwapchainCreateFlagsKHR;

`VkSwapchainCreateFlagsKHR` is a bitmask type for setting a mask of zero
or more [VkSwapchainCreateFlagBitsKHR](#VkSwapchainCreateFlagBitsKHR).

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) includes a
`VkDeviceGroupSwapchainCreateInfoKHR` structure, then that structure
includes a set of device group present modes that the swapchain **can** be used
with.

The `VkDeviceGroupSwapchainCreateInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkDeviceGroupSwapchainCreateInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    VkDeviceGroupPresentModeFlagsKHR    modes;
} VkDeviceGroupSwapchainCreateInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`modes` is a bitfield of modes that the swapchain **can** be used with.

If this structure is not present, `modes` is considered to be
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupSwapchainCreateInfoKHR-sType-sType) VUID-VkDeviceGroupSwapchainCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_SWAPCHAIN_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-parameter) VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-parameter

 `modes` **must** be a valid combination of [VkDeviceGroupPresentModeFlagBitsKHR](#VkDeviceGroupPresentModeFlagBitsKHR) values

* 
[](#VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-requiredbitmask) VUID-VkDeviceGroupSwapchainCreateInfoKHR-modes-requiredbitmask

 `modes` **must** not be `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) includes a
`VkSwapchainDisplayNativeHdrCreateInfoAMD` structure, then that
structure includes additional swapchain creation parameters specific to
display native HDR support.

The `VkSwapchainDisplayNativeHdrCreateInfoAMD` structure is defined as:

// Provided by VK_AMD_display_native_hdr
typedef struct VkSwapchainDisplayNativeHdrCreateInfoAMD {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           localDimmingEnable;
} VkSwapchainDisplayNativeHdrCreateInfoAMD;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`localDimmingEnable` specifies whether local dimming is enabled for
the swapchain.

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) does not include
this structure, the default value for `localDimmingEnable` is
[VK_TRUE](../fundamentals.html#VK_TRUE), meaning local dimming is initially enabled for the swapchain.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-sType-sType) VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_DISPLAY_NATIVE_HDR_CREATE_INFO_AMD](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

Valid Usage

* 
[](#VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-localDimmingEnable-04449) VUID-VkSwapchainDisplayNativeHdrCreateInfoAMD-localDimmingEnable-04449

It is only valid to set `localDimmingEnable` to [VK_TRUE](../fundamentals.html#VK_TRUE) if
[VkDisplayNativeHdrSurfaceCapabilitiesAMD](#VkDisplayNativeHdrSurfaceCapabilitiesAMD)::`localDimmingSupport`
is supported

The local dimming HDR setting may also be changed over the life of a
swapchain by calling:

// Provided by VK_AMD_display_native_hdr
void vkSetLocalDimmingAMD(
    VkDevice                                    device,
    VkSwapchainKHR                              swapChain,
    VkBool32                                    localDimmingEnable);

* 
`device` is the device associated with `swapChain`.

* 
`swapChain` handle to enable local dimming.

* 
`localDimmingEnable` specifies whether local dimming is enabled for
the swapchain.

Valid Usage (Implicit)

* 
[](#VUID-vkSetLocalDimmingAMD-device-parameter) VUID-vkSetLocalDimmingAMD-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetLocalDimmingAMD-swapChain-parameter) VUID-vkSetLocalDimmingAMD-swapChain-parameter

 `swapChain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkSetLocalDimmingAMD-swapChain-parent) VUID-vkSetLocalDimmingAMD-swapChain-parent

 `swapChain` **must** have been created, allocated, or retrieved from `device`

Valid Usage

* 
[](#VUID-vkSetLocalDimmingAMD-localDimmingSupport-04618) VUID-vkSetLocalDimmingAMD-localDimmingSupport-04618

[VkDisplayNativeHdrSurfaceCapabilitiesAMD](#VkDisplayNativeHdrSurfaceCapabilitiesAMD)::`localDimmingSupport`
**must** be supported

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) includes a
[VkSurfaceFullScreenExclusiveInfoEXT](#VkSurfaceFullScreenExclusiveInfoEXT) structure, then that structure
specifies the application’s preferred full-screen presentation behavior.
If this structure is not present, `fullScreenExclusive` is considered to
be [VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT](#VkFullScreenExclusiveEXT).

To enable surface counters when creating a swapchain, add a
`VkSwapchainCounterCreateInfoEXT` structure to the `pNext` chain of
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR).
`VkSwapchainCounterCreateInfoEXT` is defined as:

// Provided by VK_EXT_display_control
typedef struct VkSwapchainCounterCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkSurfaceCounterFlagsEXT    surfaceCounters;
} VkSwapchainCounterCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surfaceCounters` is a bitmask of [VkSurfaceCounterFlagBitsEXT](#VkSurfaceCounterFlagBitsEXT)
specifying surface counters to enable for the swapchain.

Valid Usage

* 
[](#VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-01244) VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-01244

The bits in `surfaceCounters` **must** be supported by
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`surface`, as reported by
[vkGetPhysicalDeviceSurfaceCapabilities2EXT](#vkGetPhysicalDeviceSurfaceCapabilities2EXT)

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainCounterCreateInfoEXT-sType-sType) VUID-VkSwapchainCounterCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_COUNTER_CREATE_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-parameter) VUID-VkSwapchainCounterCreateInfoEXT-surfaceCounters-parameter

 `surfaceCounters` **must** be a valid combination of [VkSurfaceCounterFlagBitsEXT](#VkSurfaceCounterFlagBitsEXT) values

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

The requested counters become active when the first presentation command for
the associated swapchain is processed by the presentation engine.
To query the value of an active counter, use:

// Provided by VK_EXT_display_control
VkResult vkGetSwapchainCounterEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkSurfaceCounterFlagBitsEXT                 counter,
    uint64_t*                                   pCounterValue);

* 
`device` is the [VkDevice](../devsandqueues.html#VkDevice) associated with `swapchain`.

* 
`swapchain` is the swapchain from which to query the counter value.

* 
`counter` is a [VkSurfaceCounterFlagBitsEXT](#VkSurfaceCounterFlagBitsEXT) value specifying
the counter to query.

* 
`pCounterValue` will return the current value of the counter.

If a counter is not available because the swapchain is out of date, the
implementation **may** return [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult).

Valid Usage

* 
[](#VUID-vkGetSwapchainCounterEXT-swapchain-01245) VUID-vkGetSwapchainCounterEXT-swapchain-01245

One or more present commands on `swapchain` **must** have been
processed by the presentation engine

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainCounterEXT-device-parameter) VUID-vkGetSwapchainCounterEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSwapchainCounterEXT-swapchain-parameter) VUID-vkGetSwapchainCounterEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetSwapchainCounterEXT-counter-parameter) VUID-vkGetSwapchainCounterEXT-counter-parameter

 `counter` **must** be a valid [VkSurfaceCounterFlagBitsEXT](#VkSurfaceCounterFlagBitsEXT) value

* 
[](#VUID-vkGetSwapchainCounterEXT-pCounterValue-parameter) VUID-vkGetSwapchainCounterEXT-pCounterValue-parameter

 `pCounterValue` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSwapchainCounterEXT-swapchain-parent) VUID-vkGetSwapchainCounterEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To specify compression properties for the swapchain images in this
swapchain, add a [VkImageCompressionControlEXT](../resources.html#VkImageCompressionControlEXT) structure to the
`pNext` chain of the [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure.

Applications **can** modify the presentation mode used by the swapchain on a
per-presentation basis.
However, all presentation modes the application intends to use with the
swapchain **must** be specified at swapchain creation time.
To specify more than one presentation mode when creating a swapchain,
include the `VkSwapchainPresentModesCreateInfoKHR` structure in the
`pNext` chain of the [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure.

The `VkSwapchainPresentModesCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentModesCreateInfoKHR {
    VkStructureType            sType;
    const void*                pNext;
    uint32_t                   presentModeCount;
    const VkPresentModeKHR*    pPresentModes;
} VkSwapchainPresentModesCreateInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentModesCreateInfoKHR
typedef VkSwapchainPresentModesCreateInfoKHR VkSwapchainPresentModesCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentModeCount` is the number of presentation modes provided.

* 
`pPresentModes` is a list of presentation modes with
`presentModeCount` entries

Valid Usage

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-None-07762) VUID-VkSwapchainPresentModesCreateInfoKHR-None-07762

Each entry in pPresentModes **must** be one of the [VkPresentModeKHR](#VkPresentModeKHR)
values returned by `vkGetPhysicalDeviceSurfacePresentModesKHR` for
the surface

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeFifoLatestReady-10160) VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeFifoLatestReady-10160

If the [    `presentModeFifoLatestReady`](../features.html#features-presentModeFifoLatestReady) feature is not enabled, pPresentModes
**must** not contain [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-07763) VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-07763

The entries in pPresentModes **must** be a subset of the present modes
returned in
[VkSurfacePresentModeCompatibilityKHR](#VkSurfacePresentModeCompatibilityKHR)::`pPresentModes`, given
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`presentMode` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-presentMode-07764) VUID-VkSwapchainPresentModesCreateInfoKHR-presentMode-07764

[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`presentMode` **must** be included in
`pPresentModes`

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-sType-sType) VUID-VkSwapchainPresentModesCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODES_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-parameter) VUID-VkSwapchainPresentModesCreateInfoKHR-pPresentModes-parameter

 `pPresentModes` **must** be a valid pointer to an array of `presentModeCount` valid [VkPresentModeKHR](#VkPresentModeKHR) values

* 
[](#VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeCount-arraylength) VUID-VkSwapchainPresentModesCreateInfoKHR-presentModeCount-arraylength

 `presentModeCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

When an application presents a swapchain image with dimensions different
than those of the target surface, different behavior is possible on
different platforms per their respective specifications:

* 
Presentation fails and [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) is returned

* 
Scaling is done and [VK_SUCCESS](../fundamentals.html#VkResult) or [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) is
returned

* 
Unspecified scaling using an arbitrary combination of stretching,
centering and/or clipping.

Applications **can** define specific behavior when creating a swapchain by
including the `VkSwapchainPresentScalingCreateInfoKHR` structure in the
`pNext` chain of the [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure.

The `VkSwapchainPresentScalingCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentScalingCreateInfoKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkPresentScalingFlagsKHR    scalingBehavior;
    VkPresentGravityFlagsKHR    presentGravityX;
    VkPresentGravityFlagsKHR    presentGravityY;
} VkSwapchainPresentScalingCreateInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentScalingCreateInfoKHR
typedef VkSwapchainPresentScalingCreateInfoKHR VkSwapchainPresentScalingCreateInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`scalingBehavior` is `0` or the scaling method to use when the
dimensions of the surface and swapchain images differ.

* 
`presentGravityX` is `0` or the x-axis direction in which swapchain
image pixels gravitate relative to the surface when
`scalingBehavior` does not result in a one-to-one pixel mapping
between the scaled swapchain image and the surface.

* 
`presentGravityY` is `0` or the y-axis direction in which swapchain
image pixels gravitate relative to the surface when
`scalingBehavior` does not result in a one-to-one pixel mapping
between the scaled swapchain image and the surface.

If `scalingBehavior` is `0`, the result of presenting a swapchain image
with dimensions that do not match the surface dimensions is implementation
and platform-dependent.
If `presentGravityX` or `presentGravityY` are `0`, the presentation
gravity **must** match that defined by the native platform surface on platforms
which define surface gravity.

Valid Usage

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07765) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07765

If `presentGravityX` is `0`, `presentGravityY` **must** be `0`

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07766) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07766

If `presentGravityX` is not `0`, `presentGravityY` **must** not be
`0`

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07767) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07767

`scalingBehavior` **must** not have more than one bit set

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07768) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07768

`presentGravityX` **must** not have more than one bit set

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07769) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07769

`presentGravityY` **must** not have more than one bit set

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07770) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07770

`scalingBehavior` **must** be `0` or a valid scaling method for the
surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentScaling`,
given [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`presentMode` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07771) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-07771

If the swapchain is created with
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR), `scalingBehavior` **must**
be `0` or a valid scaling method for the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentScaling`,
given each present mode in
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR)::`pPresentModes` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07772) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07772

`presentGravityX` **must** be `0` or a valid x-axis present gravity for
the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentGravityX`,
given [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`presentMode` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07773) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-07773

If the swapchain is created with
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR), `presentGravityX` **must**
be `0` or a valid x-axis present gravity for the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentGravityX`,
given each present mode in
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR)::`pPresentModes` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07774) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07774

`presentGravityY` **must** be `0` or a valid y-axis present gravity for
the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentGravityY`,
given [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`presentMode` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07775) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-07775

If the swapchain is created with
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR), `presentGravityY` **must**
be `0` or a valid y-axis present gravity for the surface as returned in
[VkSurfacePresentScalingCapabilitiesKHR](#VkSurfacePresentScalingCapabilitiesKHR)::`supportedPresentGravityY`,
given each present mode in
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR)::`pPresentModes` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-swapchainMaintenance1-10154) VUID-VkSwapchainPresentScalingCreateInfoKHR-swapchainMaintenance1-10154

If the [`swapchainMaintenance1`](../features.html#features-swapchainMaintenance1)
feature is not enabled, then `scalingBehavior`,
`presentGravityX`, and `presentGravityY` **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-sType-sType) VUID-VkSwapchainPresentScalingCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_SCALING_CREATE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-parameter) VUID-VkSwapchainPresentScalingCreateInfoKHR-scalingBehavior-parameter

 `scalingBehavior` **must** be a valid combination of [VkPresentScalingFlagBitsKHR](#VkPresentScalingFlagBitsKHR) values

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-parameter) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityX-parameter

 `presentGravityX` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR) values

* 
[](#VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-parameter) VUID-VkSwapchainPresentScalingCreateInfoKHR-presentGravityY-parameter

 `presentGravityY` **must** be a valid combination of [VkPresentGravityFlagBitsKHR](#VkPresentGravityFlagBitsKHR) values

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

To destroy a swapchain object call:

// Provided by VK_KHR_swapchain
void vkDestroySwapchainKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the [VkDevice](../devsandqueues.html#VkDevice) associated with `swapchain`.

* 
`swapchain` is the swapchain to destroy.

* 
`pAllocator` is the allocator used for host memory allocated for the
swapchain object when there is no more specific allocator available (see
[Memory Allocation](../memory.html#memory-allocation)).

The application **must** not destroy a swapchain until after completion of all
outstanding operations on images that were acquired from the swapchain.
`swapchain` and all associated `VkImage` handles are destroyed, and
**must** not be acquired or used any more by the application.
The memory of each `VkImage` will only be freed after that image is no
longer used by the presentation engine.
For example, if one image of the swapchain is being displayed in a window,
the memory for that image **may** not be freed until the window is destroyed,
or another swapchain is created for the window.
Destroying the swapchain does not invalidate the parent `VkSurfaceKHR`,
and a new swapchain **can** be created with it.

When a swapchain associated with a display surface is destroyed, if the
image most recently presented to the display surface is from the swapchain
being destroyed, then either any display resources modified by presenting
images from any swapchain associated with the display surface **must** be
reverted by the implementation to their state prior to the first present
performed on one of these swapchains, or such resources **must** be left in
their current state.

If `swapchain` has exclusive full-screen access, it is released before
the swapchain is destroyed.

Valid Usage

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-01282) VUID-vkDestroySwapchainKHR-swapchain-01282

All uses of presentable images acquired from `swapchain` **must** have
completed execution

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-01283) VUID-vkDestroySwapchainKHR-swapchain-01283

If `VkAllocationCallbacks` were provided when `swapchain` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-01284) VUID-vkDestroySwapchainKHR-swapchain-01284

If no `VkAllocationCallbacks` were provided when `swapchain` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySwapchainKHR-device-parameter) VUID-vkDestroySwapchainKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-parameter) VUID-vkDestroySwapchainKHR-swapchain-parameter

 If `swapchain` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkDestroySwapchainKHR-pAllocator-parameter) VUID-vkDestroySwapchainKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroySwapchainKHR-swapchain-parent) VUID-vkDestroySwapchainKHR-swapchain-parent

 If `swapchain` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

When the `[VK_KHR_display_swapchain](../../appendices/extensions.html#VK_KHR_display_swapchain)` extension is enabled, multiple
swapchains that share presentable images are created by calling:

// Provided by VK_KHR_display_swapchain
VkResult vkCreateSharedSwapchainsKHR(
    VkDevice                                    device,
    uint32_t                                    swapchainCount,
    const VkSwapchainCreateInfoKHR*             pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkSwapchainKHR*                             pSwapchains);

* 
`device` is the device to create the swapchains for.

* 
`swapchainCount` is the number of swapchains to create.

* 
`pCreateInfos` is a pointer to an array of
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structures specifying the parameters of
the created swapchains.

* 
`pAllocator` is the allocator used for host memory allocated for the
swapchain objects when there is no more specific allocator available
(see [Memory Allocation](../memory.html#memory-allocation)).

* 
`pSwapchains` is a pointer to an array of [VkSwapchainKHR](#VkSwapchainKHR)
handles in which the created swapchain objects will be returned.

`vkCreateSharedSwapchainsKHR` is similar to [vkCreateSwapchainKHR](#vkCreateSwapchainKHR),
except that it takes an array of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structures,
and returns an array of swapchain objects.

The swapchain creation parameters that affect the properties and number of
presentable images **must** match between all the swapchains.
If the displays used by any of the swapchains do not use the same
presentable image layout or are incompatible in a way that prevents sharing
images, swapchain creation will fail with the result code
[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](../fundamentals.html#VkResult).
If any error occurs, no swapchains will be created.
Images presented to multiple swapchains **must** be re-acquired from all of
them before being modified.
After destroying one or more of the swapchains, the remaining swapchains and
the presentable images **can** continue to be used.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSharedSwapchainsKHR-device-parameter) VUID-vkCreateSharedSwapchainsKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateSharedSwapchainsKHR-pCreateInfos-parameter) VUID-vkCreateSharedSwapchainsKHR-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `swapchainCount` valid [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structures

* 
[](#VUID-vkCreateSharedSwapchainsKHR-pAllocator-parameter) VUID-vkCreateSharedSwapchainsKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateSharedSwapchainsKHR-pSwapchains-parameter) VUID-vkCreateSharedSwapchainsKHR-pSwapchains-parameter

 `pSwapchains` **must** be a valid pointer to an array of `swapchainCount` [VkSwapchainKHR](#VkSwapchainKHR) handles

* 
[](#VUID-vkCreateSharedSwapchainsKHR-device-queuecount) VUID-vkCreateSharedSwapchainsKHR-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkCreateSharedSwapchainsKHR-swapchainCount-arraylength) VUID-vkCreateSharedSwapchainsKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To obtain the array of presentable images associated with a swapchain, call:

// Provided by VK_KHR_swapchain
VkResult vkGetSwapchainImagesKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint32_t*                                   pSwapchainImageCount,
    VkImage*                                    pSwapchainImages);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to query.

* 
`pSwapchainImageCount` is a pointer to an integer related to the
number of presentable images available or queried, as described below.

* 
`pSwapchainImages` is either `NULL` or a pointer to an array of
`VkImage` handles.

If `pSwapchainImages` is `NULL`, then the number of presentable images
for `swapchain` is returned in `pSwapchainImageCount`.
Otherwise, `pSwapchainImageCount` **must** point to a variable set by the
application to the number of elements in the `pSwapchainImages` array,
and on return the variable is overwritten with the number of structures
actually written to `pSwapchainImages`.
If the value of `pSwapchainImageCount` is less than the number of
presentable images for `swapchain`, at most `pSwapchainImageCount`
structures will be written, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned instead
of [VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available presentable
images were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainImagesKHR-device-parameter) VUID-vkGetSwapchainImagesKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSwapchainImagesKHR-swapchain-parameter) VUID-vkGetSwapchainImagesKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetSwapchainImagesKHR-pSwapchainImageCount-parameter) VUID-vkGetSwapchainImagesKHR-pSwapchainImageCount-parameter

 `pSwapchainImageCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetSwapchainImagesKHR-pSwapchainImages-parameter) VUID-vkGetSwapchainImagesKHR-pSwapchainImages-parameter

 If the value referenced by `pSwapchainImageCount` is not `0`, and `pSwapchainImages` is not `NULL`, `pSwapchainImages` **must** be a valid pointer to an array of `pSwapchainImageCount` [VkImage](../resources.html#VkImage) handles

* 
[](#VUID-vkGetSwapchainImagesKHR-swapchain-parent) VUID-vkGetSwapchainImagesKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

|  | By knowing all presentable images used in the swapchain, the application can
| --- | --- |
create command buffers that reference these images prior to entering its
main rendering loop.
However, command buffers are not allowed to reference presentable images
created with [VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#VkSwapchainCreateFlagBitsKHR)
until their indices have been returned from [vkAcquireNextImageKHR](#vkAcquireNextImageKHR) at
least once. |

Images returned by [vkGetSwapchainImagesKHR](#vkGetSwapchainImagesKHR) are fully backed by memory
before they are passed to the application, as if they are each bound
completely and contiguously to a single `VkDeviceMemory` object
, unless the swapchain is created with the
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) flag
.
All presentable images are initially in the [VK_IMAGE_LAYOUT_UNDEFINED](../resources.html#VkImageLayout)
layout, thus before using presentable images, the application **must**
transition them to a valid layout for the intended use.

Further, the lifetime of presentable images is controlled by the
implementation, so applications **must** not destroy a presentable image.
See [vkDestroySwapchainKHR](#vkDestroySwapchainKHR) for further details on the lifetime of
presentable images.

Images **can** also be created by using [vkCreateImage](../resources.html#vkCreateImage) with
[VkImageSwapchainCreateInfoKHR](../resources.html#VkImageSwapchainCreateInfoKHR) and bound to swapchain memory using
[vkBindImageMemory2](../resources.html#vkBindImageMemory2) with [VkBindImageMemorySwapchainInfoKHR](../resources.html#VkBindImageMemorySwapchainInfoKHR).
These images **can** be used anywhere swapchain images are used, and are useful
in logical devices with multiple physical devices to create peer memory
bindings of swapchain memory.
These images and bindings have no effect on what memory is presented.
Unlike images retrieved from `vkGetSwapchainImagesKHR`, these images
**must** be destroyed with [vkDestroyImage](../resources.html#vkDestroyImage).

To acquire an available presentable image to use, and retrieve the index of
that image, call:

// Provided by VK_KHR_swapchain
VkResult vkAcquireNextImageKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint64_t                                    timeout,
    VkSemaphore                                 semaphore,
    VkFence                                     fence,
    uint32_t*                                   pImageIndex);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the non-retired swapchain from which an image is
being acquired.

* 
`timeout` specifies how long the function waits, in nanoseconds, if
no image is available.

* 
`semaphore` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) or a semaphore defining a
[semaphore signal operation](../synchronization.html#synchronization-semaphores-signaling).

* 
`fence` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) or a fence to signal.

* 
`pImageIndex` is a pointer to a `uint32_t` in which the index of
the next image to use (i.e. an index into the array of images returned
by `vkGetSwapchainImagesKHR`) is returned.

If the `swapchain` has been created with the
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) flag, the image
whose index is returned in `pImageIndex` will be fully backed by memory
before this call returns to the application, as if it is bound completely
and contiguously to a single `VkDeviceMemory` object.

If `semaphore` defines a
[semaphore signal operation](../synchronization.html#synchronization-semaphores-signaling), its
first [synchronization scope](../synchronization.html#synchronization-dependencies-scopes)
includes acquisition of the image.

Valid Usage

* 
[](#VUID-vkAcquireNextImageKHR-swapchain-01285) VUID-vkAcquireNextImageKHR-swapchain-01285

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-01286) VUID-vkAcquireNextImageKHR-semaphore-01286

If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** be unsignaled

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-01779) VUID-vkAcquireNextImageKHR-semaphore-01779

If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** not have any
uncompleted signal or wait operations pending

* 
[](#VUID-vkAcquireNextImageKHR-fence-01287) VUID-vkAcquireNextImageKHR-fence-01287

If `fence` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be
unsignaled

* 
[](#VUID-vkAcquireNextImageKHR-fence-10066) VUID-vkAcquireNextImageKHR-fence-10066

If `fence` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-01780) VUID-vkAcquireNextImageKHR-semaphore-01780

`semaphore` and `fence` **must** not both be equal to
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkAcquireNextImageKHR-surface-07783) VUID-vkAcquireNextImageKHR-surface-07783

If [forward progress](#swapchain-acquire-forward-progress) cannot be
guaranteed for the `surface` used to create the `swapchain`
member of `pAcquireInfo`, `timeout` **must** not be `UINT64_MAX`

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-03265) VUID-vkAcquireNextImageKHR-semaphore-03265

`semaphore` **must** have a [VkSemaphoreType](../synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_BINARY](../synchronization.html#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireNextImageKHR-device-parameter) VUID-vkAcquireNextImageKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAcquireNextImageKHR-swapchain-parameter) VUID-vkAcquireNextImageKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-parameter) VUID-vkAcquireNextImageKHR-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `semaphore` **must** be a valid [VkSemaphore](../synchronization.html#VkSemaphore) handle

* 
[](#VUID-vkAcquireNextImageKHR-fence-parameter) VUID-vkAcquireNextImageKHR-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be a valid [VkFence](../synchronization.html#VkFence) handle

* 
[](#VUID-vkAcquireNextImageKHR-pImageIndex-parameter) VUID-vkAcquireNextImageKHR-pImageIndex-parameter

 `pImageIndex` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkAcquireNextImageKHR-swapchain-parent) VUID-vkAcquireNextImageKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkAcquireNextImageKHR-semaphore-parent) VUID-vkAcquireNextImageKHR-semaphore-parent

 If `semaphore` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkAcquireNextImageKHR-fence-parent) VUID-vkAcquireNextImageKHR-fence-parent

 If `fence` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

* 
Host access to `semaphore` **must** be externally synchronized

* 
Host access to `fence` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](../fundamentals.html#VkResult)

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

* 
[VK_TIMEOUT](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

If an image is acquired successfully, `vkAcquireNextImageKHR` **must**
either return [VK_SUCCESS](../fundamentals.html#VkResult) or [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult).
The implementation **may** return [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) if the swapchain no
longer matches the surface properties exactly, but **can** still be used for
presentation.

When successful, `vkAcquireNextImageKHR` acquires a presentable image
from `swapchain` that an application **can** use, and sets
`pImageIndex` to the index of that image within the swapchain.
The presentation engine **may** not have finished reading from the image at the
time it is acquired, so the application **must** use `semaphore` and/or
`fence` to ensure that the image layout and contents are not modified
until the presentation engine reads have completed.
Once `vkAcquireNextImageKHR` successfully acquires an image, the
semaphore signal operation referenced by `semaphore`, if not
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), and the fence signal operation referenced by
`fence`, if not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), are submitted for execution.
If `vkAcquireNextImageKHR` does not successfully acquire an image,
`semaphore` and `fence` are unaffected.
The order in which images are acquired is implementation-dependent, and **may**
be different than the order the images were presented.

If `timeout` is zero, then `vkAcquireNextImageKHR` does not wait,
and will either successfully acquire an image, or fail and return
[VK_NOT_READY](../fundamentals.html#VkResult) if no image is available.

If the specified timeout period expires before an image is acquired,
`vkAcquireNextImageKHR` returns [VK_TIMEOUT](../fundamentals.html#VkResult).
If `timeout` is `UINT64_MAX`, the timeout period is treated as
infinite, and `vkAcquireNextImageKHR` will block until an image is
acquired or an error occurs.

Let S be the number of images in `swapchain`.
If `swapchain` is created with
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR), let M be the maximum of
the values in [VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`minImageCount` when
queried with each present mode in
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR)::`pPresentModes` in
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR).
Otherwise, let M be the value of
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`minImageCount` without a
[VkSurfacePresentModeKHR](#VkSurfacePresentModeKHR) as part of the query input.

`vkAcquireNextImageKHR` **should** not be called if the number of images
that the application has currently acquired is greater than S-M.
If `vkAcquireNextImageKHR` is called when the number of images that the
application has currently acquired is less than or equal to S-M,
`vkAcquireNextImageKHR` **must** return in finite time with an allowed
[VkResult](../fundamentals.html#VkResult) code.

|  | Returning a result in finite time guarantees that the implementation cannot
| --- | --- |
deadlock an application, or suspend its execution indefinitely with correct
API usage.
Acquiring too many images at once may block indefinitely, which is covered
by valid usage when attempting to use `UINT64_MAX`.
For example, a scenario here is when a compositor holds on to images which
are currently being presented, and there are not any vacant images left to
be acquired. |

If the swapchain images no longer match native surface properties, either
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) or [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) **must** be returned.
If [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) is returned, no image is acquired and
attempts to present previously acquired images to the swapchain will also
fail with [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult).
Applications need to create a new swapchain for the surface to continue
presenting if [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) is returned.

|  | [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) **may** happen, for example, if the platform surface
| --- | --- |
has been resized but the platform is able to scale the presented images to
the new size to produce valid surface updates.
It is up to the application to decide whether it prefers to continue using
the current swapchain in this state, or to re-create the swapchain to better
match the platform surface properties. |

If device loss occurs (see [Lost Device](../devsandqueues.html#devsandqueues-lost-device)) before
the timeout has expired, `vkAcquireNextImageKHR` **must** return in finite
time with either one of the allowed success codes, or
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult).

If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the semaphore **must** be
unsignaled, with no signal or wait operations pending.
It will become signaled when the application **can** use the image.

|  | Use of `semaphore` allows rendering operations to be recorded and
| --- | --- |
submitted before the presentation engine has completed its use of the image. |

If `fence` is not equal to [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), the fence **must** be
unsignaled, with no signal operations pending.
It will become signaled when the application **can** use the image.

|  | Applications **should** not rely on `vkAcquireNextImageKHR` blocking in
| --- | --- |
order to meter their rendering speed.
The implementation **may** return from this function immediately regardless of
how many presentation requests are queued, and regardless of when queued
presentation requests will complete relative to the call.
Instead, applications **can** use `fence` to meter their frame generation
work to match the presentation rate. |

An application **must** wait until either the `semaphore` or `fence` is
signaled before accessing the image’s data.

|  | When the presentable image will be accessed by some stage S, the
| --- | --- |
recommended idiom for ensuring correct synchronization is:

* 
The [VkSubmitInfo](../cmdbuffers.html#VkSubmitInfo) used to submit the image layout transition for
execution includes `vkAcquireNextImageKHR`::`semaphore` in its
`pWaitSemaphores` member, with the corresponding element of
`pWaitDstStageMask` including S.

* 
The [synchronization command](../synchronization.html#synchronization) that performs any
necessary image layout transition includes S in both the
`srcStageMask` and `dstStageMask`. |

After a successful return, the image indicated by `pImageIndex` and its
data will be unmodified compared to when it was presented.

|  | Exclusive ownership of presentable images corresponding to a swapchain
| --- | --- |
created with [VK_SHARING_MODE_EXCLUSIVE](../resources.html#VkSharingMode) as defined in
[Resource Sharing](../resources.html#resources-sharing) is not altered by a call to
`vkAcquireNextImageKHR`.
That means upon the first acquisition from such a swapchain presentable
images are not owned by any queue family, while at subsequent acquisitions
the presentable images remain owned by the queue family the image was
previously presented on. |

The possible return values for `vkAcquireNextImageKHR` depend on the
`timeout` provided:

* 
[VK_SUCCESS](../fundamentals.html#VkResult) is returned if an image became available.

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult) is returned if the surface becomes no
longer available.

* 
[VK_NOT_READY](../fundamentals.html#VkResult) is returned if `timeout` is zero and no image was
available.

* 
[VK_TIMEOUT](../fundamentals.html#VkResult) is returned if `timeout` is greater than zero and
less than `UINT64_MAX`, and no image became available within the time
allowed.

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) **may** be returned if an image became available,
and the swapchain no longer matches the surface properties exactly, but
**can** still be used to present to the surface successfully.

|  | This **may** happen, for example, if the platform surface has been resized but
| --- | --- |
the platform is able to scale the presented images to the new size to
produce valid surface updates.
It is up to the application to decide whether it prefers to continue using
the current swapchain indefinitely or temporarily in this state, or to
re-create the swapchain to better match the platform surface properties. |

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) is returned if the surface has changed in
such a way that it is no longer compatible with the swapchain, and
further presentation requests using the swapchain will fail.
Applications **must** query the new surface properties and recreate their
swapchain if they wish to continue presenting to the surface.

If the native surface and presented image sizes no longer match,
presentation **may** fail
unless the swapchain is created with a non-zero value in
[VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR)::`scalingBehavior`
.
If presentation does succeed, the mapping from the presented image to the
native surface is
defined by the [VkSwapchainPresentScalingCreateInfoKHR](#VkSwapchainPresentScalingCreateInfoKHR) structure if
provided.
Otherwise it is
implementation-defined.
It is the application’s responsibility to detect surface size changes and
react appropriately.
If presentation fails because of a mismatch in the surface and presented
image sizes, a [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) error will be returned.

|  | For example, consider a 4x3 window/surface that gets resized to be 3x4
| --- | --- |
(taller than wider).
On some window systems, the portion of the window/surface that was
previously and still is visible (the 3x3 part) will contain the same
contents as before, while the remaining parts of the window will have
**undefined** contents.
Other window systems **may** squash/stretch the image to fill the new window
size without any **undefined** contents, or apply some other mapping. |

To acquire an available presentable image to use, and retrieve the index of
that image, call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
VkResult vkAcquireNextImage2KHR(
    VkDevice                                    device,
    const VkAcquireNextImageInfoKHR*            pAcquireInfo,
    uint32_t*                                   pImageIndex);

* 
`device` is the device associated with `swapchain`.

* 
`pAcquireInfo` is a pointer to a [VkAcquireNextImageInfoKHR](#VkAcquireNextImageInfoKHR)
structure containing parameters of the acquire.

* 
`pImageIndex` is a pointer to a `uint32_t` value specifying the
index of the next image to use.

If the `swapchain` has been created with the
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) flag, the image
whose index is returned in `pImageIndex` will be fully backed by memory
before this call returns to the application.

Valid Usage

* 
[](#VUID-vkAcquireNextImage2KHR-surface-07784) VUID-vkAcquireNextImage2KHR-surface-07784

If [forward progress](#swapchain-acquire-forward-progress) cannot be
guaranteed for the `surface` used to create `swapchain`, the
`timeout` member of `pAcquireInfo` **must** not be `UINT64_MAX`

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireNextImage2KHR-device-parameter) VUID-vkAcquireNextImage2KHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAcquireNextImage2KHR-pAcquireInfo-parameter) VUID-vkAcquireNextImage2KHR-pAcquireInfo-parameter

 `pAcquireInfo` **must** be a valid pointer to a valid [VkAcquireNextImageInfoKHR](#VkAcquireNextImageInfoKHR) structure

* 
[](#VUID-vkAcquireNextImage2KHR-pImageIndex-parameter) VUID-vkAcquireNextImage2KHR-pImageIndex-parameter

 `pImageIndex` **must** be a valid pointer to a `uint32_t` value

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](../fundamentals.html#VkResult)

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

* 
[VK_TIMEOUT](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkAcquireNextImageInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkAcquireNextImageInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
    uint64_t           timeout;
    VkSemaphore        semaphore;
    VkFence            fence;
    uint32_t           deviceMask;
} VkAcquireNextImageInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is a non-retired swapchain from which an image is
acquired.

* 
`timeout` specifies how long the function waits, in nanoseconds, if
no image is available.

* 
`semaphore` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) or a semaphore that defines a
[semaphore signal operation](../synchronization.html#synchronization-semaphores-signaling).

* 
`fence` is [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) or a fence to signal.

* 
`deviceMask` is a mask of physical devices for which the swapchain
image will be ready to use when the semaphore or fence is signaled.

If [vkAcquireNextImageKHR](#vkAcquireNextImageKHR) is used, the device mask is considered to
include all physical devices in the logical device.

|  | [vkAcquireNextImage2KHR](#vkAcquireNextImage2KHR) signals at most one semaphore, even if the
| --- | --- |
application requests waiting for multiple physical devices to be ready via
the `deviceMask`.
However, only a single physical device **can** wait on that semaphore, since
the semaphore becomes unsignaled when the wait succeeds.
For other physical devices to wait for the image to be ready, it is
necessary for the application to submit semaphore signal operation(s) to
that first physical device to signal additional semaphore(s) after the wait
succeeds, which the other physical device(s) **can** wait upon. |

Valid Usage

* 
[](#VUID-VkAcquireNextImageInfoKHR-swapchain-01675) VUID-VkAcquireNextImageInfoKHR-swapchain-01675

`swapchain` **must** not be in the retired state

* 
[](#VUID-VkAcquireNextImageInfoKHR-semaphore-01288) VUID-VkAcquireNextImageInfoKHR-semaphore-01288

If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** be unsignaled

* 
[](#VUID-VkAcquireNextImageInfoKHR-semaphore-01781) VUID-VkAcquireNextImageInfoKHR-semaphore-01781

If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** not have any
uncompleted signal or wait operations pending

* 
[](#VUID-VkAcquireNextImageInfoKHR-fence-01289) VUID-VkAcquireNextImageInfoKHR-fence-01289

If `fence` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be
unsignaled

* 
[](#VUID-VkAcquireNextImageInfoKHR-fence-10067) VUID-VkAcquireNextImageInfoKHR-fence-10067

If `fence` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-VkAcquireNextImageInfoKHR-semaphore-01782) VUID-VkAcquireNextImageInfoKHR-semaphore-01782

`semaphore` and `fence` **must** not both be equal to
[VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkAcquireNextImageInfoKHR-deviceMask-01290) VUID-VkAcquireNextImageInfoKHR-deviceMask-01290

`deviceMask` **must** be a valid device mask

* 
[](#VUID-VkAcquireNextImageInfoKHR-deviceMask-01291) VUID-VkAcquireNextImageInfoKHR-deviceMask-01291

`deviceMask` **must** not be zero

* 
[](#VUID-VkAcquireNextImageInfoKHR-semaphore-03266) VUID-VkAcquireNextImageInfoKHR-semaphore-03266

`semaphore` **must** have a [VkSemaphoreType](../synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_BINARY](../synchronization.html#VkSemaphoreTypeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkAcquireNextImageInfoKHR-sType-sType) VUID-VkAcquireNextImageInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACQUIRE_NEXT_IMAGE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkAcquireNextImageInfoKHR-pNext-pNext) VUID-VkAcquireNextImageInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAcquireNextImageInfoKHR-swapchain-parameter) VUID-VkAcquireNextImageInfoKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-VkAcquireNextImageInfoKHR-semaphore-parameter) VUID-VkAcquireNextImageInfoKHR-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `semaphore` **must** be a valid [VkSemaphore](../synchronization.html#VkSemaphore) handle

* 
[](#VUID-VkAcquireNextImageInfoKHR-fence-parameter) VUID-VkAcquireNextImageInfoKHR-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be a valid [VkFence](../synchronization.html#VkFence) handle

* 
[](#VUID-VkAcquireNextImageInfoKHR-commonparent) VUID-VkAcquireNextImageInfoKHR-commonparent

 Each of `fence`, `semaphore`, and `swapchain` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

* 
Host access to `semaphore` **must** be externally synchronized

* 
Host access to `fence` **must** be externally synchronized

After queueing all rendering commands and transitioning the image to the
correct layout, to queue an image for presentation, call:

// Provided by VK_KHR_swapchain
VkResult vkQueuePresentKHR(
    VkQueue                                     queue,
    const VkPresentInfoKHR*                     pPresentInfo);

* 
`queue` is a queue that is capable of presentation to the target
surface’s platform on the same device as the image’s swapchain.

* 
`pPresentInfo` is a pointer to a [VkPresentInfoKHR](#VkPresentInfoKHR) structure
specifying parameters of the presentation.

|  | There is no requirement for an application to present images in the same
| --- | --- |
order that they were acquired - applications can arbitrarily present any
image that is currently acquired. |

|  | The origin of the native orientation of the surface coordinate system is not
| --- | --- |
specified in the Vulkan specification; it depends on the platform.
For most platforms the origin is by default upper-left, meaning the pixel of
the presented [VkImage](../resources.html#VkImage) at coordinates (0,0) would appear at the
upper left pixel of the platform surface (assuming
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](#VkSurfaceTransformFlagBitsKHR), and the display standing the
right way up). |

The result codes [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) and [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)
have the same meaning when returned by `vkQueuePresentKHR` as they do
when returned by `vkAcquireNextImageKHR`.
If any `swapchain` member of `pPresentInfo` was created with
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#VkFullScreenExclusiveEXT),
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult) will be returned if that
swapchain does not have exclusive full-screen access, possibly for
implementation-specific reasons outside of the application’s control.
If multiple swapchains are presented, the result code is determined by
applying the following rules in order:

* 
If the device is lost, [VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult) is returned.

* 
If any of the target surfaces are no longer available the error
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult) is returned.

* 
If any of the presents would have a result of
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) if issued separately then
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) is returned.

* 
If any of the presents would have a result of
[VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT](../fundamentals.html#VkResult) if issued separately then
[VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT](../fundamentals.html#VkResult) is returned.

* 
If any of the presents would have a result of
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult) if issued separately
then [VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult) is returned.

* 
If any of the presents would have a result of [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) if
issued separately then [VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult) is returned.

* 
Otherwise [VK_SUCCESS](../fundamentals.html#VkResult) is returned.

Any writes to memory backing the images referenced by the
`pImageIndices` and `pSwapchains` members of `pPresentInfo`,
that are available before [vkQueuePresentKHR](#vkQueuePresentKHR) is executed, are
automatically made visible to the read access performed by the presentation
engine.
This automatic visibility operation for an image happens-after the semaphore
wait operation, and happens-before the presentation engine accesses the
image.

Presentation is a read-only operation that will not affect the content of
the presentable images.
Upon reacquiring the image and transitioning it away from the
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](../resources.html#VkImageLayout) layout, the contents will be the same
as they were prior to transitioning the image to the present source layout
and presenting it.
However, if a mechanism other than Vulkan is used to modify the platform
window associated with the swapchain, the content of all presentable images
in the swapchain becomes **undefined**.

Calls to `vkQueuePresentKHR` **may** block, but **must** return in finite
time.
The processing of the presentation happens in issue order with other queue
operations, but semaphores **must** be used to ensure that prior rendering and
other commands in the specified queue complete before the presentation
begins.
The presentation command itself does not delay processing of subsequent
commands on the queue.
However, presentation requests sent to a particular queue are always
performed in order.
Exact presentation timing is controlled by the semantics of the presentation
engine and native platform in use.

If an image is presented to a swapchain created from a display surface, the
mode of the associated display will be updated, if necessary, to match the
mode specified when creating the display surface.
The mode switch and presentation of the specified image will be performed as
one atomic operation.

Queueing an image for presentation defines a set of *queue operations*,
including waiting on the semaphores and submitting a presentation request to
the presentation engine.
However, the scope of this set of queue operations does not include the
actual processing of the image by the presentation engine.

If `vkQueuePresentKHR` fails to enqueue the corresponding set of queue
operations, it **may** return [VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult) or
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult).
If it does, the implementation **must** ensure that the state and contents of
any resources or synchronization primitives referenced is unaffected by the
call or its failure.

If `vkQueuePresentKHR` fails in such a way that the implementation is
unable to make that guarantee, the implementation **must** return
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult).

However, if the presentation request is rejected by the presentation engine
with an error [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult),
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult),
or [VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult), the set of queue operations are still
considered to be enqueued and thus any [semaphore wait operation](../synchronization.html#synchronization-semaphores-waiting) specified in [VkPresentInfoKHR](#VkPresentInfoKHR) will execute
when the corresponding queue operation is complete.

`vkQueuePresentKHR` releases the acquisition of the images referenced by
`imageIndices`.
The queue family corresponding to the queue `vkQueuePresentKHR` is
executed on **must** have ownership of the presented images as defined in
[Resource Sharing](../resources.html#resources-sharing).
`vkQueuePresentKHR` does not alter the queue family ownership, but the
presented images **must** not be used again before they have been reacquired
using `vkAcquireNextImageKHR`.

|  | The application **can** continue to present any acquired images from a retired
| --- | --- |
swapchain as long as the swapchain has not entered a state that causes
[vkQueuePresentKHR](#vkQueuePresentKHR) to return [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult). |

Valid Usage

* 
[](#VUID-vkQueuePresentKHR-pSwapchains-01292) VUID-vkQueuePresentKHR-pSwapchains-01292

Each element of `pSwapchains` member of `pPresentInfo` **must** be
a swapchain that is created for a surface for which presentation is
supported from `queue` as determined using a call to
`vkGetPhysicalDeviceSurfaceSupportKHR`

* 
[](#VUID-vkQueuePresentKHR-pSwapchains-01293) VUID-vkQueuePresentKHR-pSwapchains-01293

If more than one member of `pSwapchains` was created from a display
surface, all display surfaces referenced that refer to the same display
**must** use the same display mode

* 
[](#VUID-vkQueuePresentKHR-pSwapchains-10285) VUID-vkQueuePresentKHR-pSwapchains-10285

If more than one member of `pSwapchains` was created from a display
surface, all display surfaces referenced that refer to the same display
**must** use the same [`stereoType`](#wsi-displaySurfaceStereoType)

* 
[](#VUID-vkQueuePresentKHR-pWaitSemaphores-01294) VUID-vkQueuePresentKHR-pWaitSemaphores-01294

When a semaphore wait operation referring to a binary semaphore defined
by the elements of the `pWaitSemaphores` member of
`pPresentInfo` executes on `queue`, there **must** be no other
queues waiting on the same semaphore

* 
[](#VUID-vkQueuePresentKHR-pWaitSemaphores-03267) VUID-vkQueuePresentKHR-pWaitSemaphores-03267

All elements of the `pWaitSemaphores` member of `pPresentInfo`
**must** be created with a [VkSemaphoreType](../synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_BINARY](../synchronization.html#VkSemaphoreTypeKHR)

* 
[](#VUID-vkQueuePresentKHR-pWaitSemaphores-03268) VUID-vkQueuePresentKHR-pWaitSemaphores-03268

All elements of the `pWaitSemaphores` member of `pPresentInfo`
**must** reference a semaphore signal operation that has been submitted for
execution and any [semaphore    signal operations](../synchronization.html#synchronization-semaphores-signaling) on which it depends **must** have also been submitted
for execution

Valid Usage (Implicit)

* 
[](#VUID-vkQueuePresentKHR-queue-parameter) VUID-vkQueuePresentKHR-queue-parameter

 `queue` **must** be a valid [VkQueue](../devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueuePresentKHR-pPresentInfo-parameter) VUID-vkQueuePresentKHR-pPresentInfo-parameter

 `pPresentInfo` **must** be a valid pointer to a valid [VkPresentInfoKHR](#VkPresentInfoKHR) structure

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](../devsandqueues.html#VkDeviceQueueCreateFlagBits)

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkPresentInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain
typedef struct VkPresentInfoKHR {
    VkStructureType          sType;
    const void*              pNext;
    uint32_t                 waitSemaphoreCount;
    const VkSemaphore*       pWaitSemaphores;
    uint32_t                 swapchainCount;
    const VkSwapchainKHR*    pSwapchains;
    const uint32_t*          pImageIndices;
    VkResult*                pResults;
} VkPresentInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of semaphores to wait for before
issuing the present request.
The number **may** be zero.

* 
`pWaitSemaphores` is `NULL` or a pointer to an array of
[VkSemaphore](../synchronization.html#VkSemaphore) objects with `waitSemaphoreCount` entries, and
specifies the semaphores to wait for before issuing the present request.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pSwapchains` is a pointer to an array of [VkSwapchainKHR](#VkSwapchainKHR)
objects with `swapchainCount` entries.

* 
`pImageIndices` is a pointer to an array of indices into the array
of each swapchain’s presentable images, with `swapchainCount`
entries.
Each entry in this array identifies the image to present on the
corresponding entry in the `pSwapchains` array.

* 
`pResults` is a pointer to an array of [VkResult](../fundamentals.html#VkResult) typed elements
with `swapchainCount` entries.
Applications that do not need per-swapchain results **can** use `NULL` for
`pResults`.
If non-`NULL`, each entry in `pResults` will be set to the
[VkResult](../fundamentals.html#VkResult) for presenting the swapchain corresponding to the same
index in `pSwapchains`.

Before an application **can** present an image, the image’s layout **must** be
transitioned to the [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](../resources.html#VkImageLayout)
layout, or for a shared presentable image the
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](../resources.html#VkImageLayout) layout.

|  | When transitioning the image to the appropriate layout, there is no need to
| --- | --- |
delay subsequent processing, or perform any visibility operations (as
[vkQueuePresentKHR](#vkQueuePresentKHR) performs automatic visibility operations).
To achieve this, the `dstAccessMask` member of the
[VkImageMemoryBarrier](../synchronization.html#VkImageMemoryBarrier) **should** be `0`, and the `dstStageMask`
parameter **should** be [VK_PIPELINE_STAGE_BOTTOM_OF_PIPE_BIT](../synchronization.html#VkPipelineStageFlagBits). |

The second [synchronization scope](../synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](../synchronization.html#synchronization-semaphores-waiting) defined
by this structure includes presentation of each image indicated by
`pSwapchains` and `pImageIndices`.

Valid Usage

* 
[](#VUID-VkPresentInfoKHR-pSwapchain-09231) VUID-VkPresentInfoKHR-pSwapchain-09231

Elements of `pSwapchain` **must** be unique

* 
[](#VUID-VkPresentInfoKHR-pImageIndices-01430) VUID-VkPresentInfoKHR-pImageIndices-01430

Each element of `pImageIndices` **must** be the index of a presentable
image acquired from the swapchain specified by the corresponding element
of the `pSwapchains` array, and the presented image subresource
**must** be in the [VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](../resources.html#VkImageLayout)
or [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](../resources.html#VkImageLayout)
layout at the time the operation is executed on a `VkDevice`

* 
[](#VUID-VkPresentInfoKHR-pNext-06235) VUID-VkPresentInfoKHR-pNext-06235

If a [VkPresentIdKHR](#VkPresentIdKHR) structure is included in the `pNext`
chain, and the [`presentId`](../features.html#features-presentId) feature is not
enabled, each `presentIds` entry in that structure **must** be NULL

* 
[](#VUID-VkPresentInfoKHR-swapchainMaintenance1-10158) VUID-VkPresentInfoKHR-swapchainMaintenance1-10158

If the [`swapchainMaintenance1`](../features.html#features-swapchainMaintenance1)
feature is not enabled, then the `pNext` chain **must** not include a
[VkSwapchainPresentFenceInfoKHR](#VkSwapchainPresentFenceInfoKHR) structure

* 
[](#VUID-VkPresentInfoKHR-pSwapchains-09199) VUID-VkPresentInfoKHR-pSwapchains-09199

If any element of the `pSwapchains` array has been created with
[VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR), all of the elements of this
array **must** be created with [VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR)

* 
[](#VUID-VkPresentInfoKHR-pNext-09759) VUID-VkPresentInfoKHR-pNext-09759

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](../debugging.html#VkFrameBoundaryTensorsARM) structure then it **must** also include a
[VkFrameBoundaryEXT](../debugging.html#VkFrameBoundaryEXT) structure

* 
[](#VUID-VkPresentInfoKHR-pNext-10821) VUID-VkPresentInfoKHR-pNext-10821

If a [VkPresentId2KHR](#VkPresentId2KHR) structure is included in the `pNext`
chain, and the [`presentId2`](../features.html#features-presentId2) feature is not
enabled, each `presentIds` entry in that structure **must** be zero

* 
[](#VUID-VkPresentInfoKHR-presentId2Supported-10822) VUID-VkPresentInfoKHR-presentId2Supported-10822

If a [VkPresentId2KHR](#VkPresentId2KHR) structure is included and contains non-zero
presentIds, `presentId2Supported` **must** be [VK_TRUE](../fundamentals.html#VK_TRUE) in the
[VkSurfaceCapabilitiesPresentId2KHR](#VkSurfaceCapabilitiesPresentId2KHR) structure returned by
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](#vkGetPhysicalDeviceSurfaceCapabilities2KHR) for the `surface`

Valid Usage (Implicit)

* 
[](#VUID-VkPresentInfoKHR-sType-sType) VUID-VkPresentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentInfoKHR-pNext-pNext) VUID-VkPresentInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupPresentInfoKHR](#VkDeviceGroupPresentInfoKHR), [VkDisplayPresentInfoKHR](#VkDisplayPresentInfoKHR), [VkFrameBoundaryEXT](../debugging.html#VkFrameBoundaryEXT), [VkFrameBoundaryTensorsARM](../debugging.html#VkFrameBoundaryTensorsARM), [VkPresentFrameTokenGGP](#VkPresentFrameTokenGGP), [VkPresentId2KHR](#VkPresentId2KHR), [VkPresentIdKHR](#VkPresentIdKHR), [VkPresentRegionsKHR](#VkPresentRegionsKHR), [VkPresentTimesInfoGOOGLE](#VkPresentTimesInfoGOOGLE), [VkPresentTimingsInfoEXT](#VkPresentTimingsInfoEXT), [VkSetPresentConfigNV](#VkSetPresentConfigNV), [VkSwapchainPresentFenceInfoKHR](#VkSwapchainPresentFenceInfoKHR), or [VkSwapchainPresentModeInfoKHR](#VkSwapchainPresentModeInfoKHR)

* 
[](#VUID-VkPresentInfoKHR-sType-unique) VUID-VkPresentInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPresentInfoKHR-pWaitSemaphores-parameter) VUID-VkPresentInfoKHR-pWaitSemaphores-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphores` **must** be a valid pointer to an array of `waitSemaphoreCount` valid [VkSemaphore](../synchronization.html#VkSemaphore) handles

* 
[](#VUID-VkPresentInfoKHR-pSwapchains-parameter) VUID-VkPresentInfoKHR-pSwapchains-parameter

 `pSwapchains` **must** be a valid pointer to an array of `swapchainCount` valid [VkSwapchainKHR](#VkSwapchainKHR) handles

* 
[](#VUID-VkPresentInfoKHR-pImageIndices-parameter) VUID-VkPresentInfoKHR-pImageIndices-parameter

 `pImageIndices` **must** be a valid pointer to an array of `swapchainCount` `uint32_t` values

* 
[](#VUID-VkPresentInfoKHR-pResults-parameter) VUID-VkPresentInfoKHR-pResults-parameter

 If `pResults` is not `NULL`, `pResults` **must** be a valid pointer to an array of `swapchainCount` [VkResult](../fundamentals.html#VkResult) values

* 
[](#VUID-VkPresentInfoKHR-swapchainCount-arraylength) VUID-VkPresentInfoKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

* 
[](#VUID-VkPresentInfoKHR-commonparent) VUID-VkPresentInfoKHR-commonparent

 Both of the elements of `pSwapchains`, and the elements of `pWaitSemaphores` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to each member of `pWaitSemaphores` **must** be externally synchronized

* 
Host access to each member of `pSwapchains` **must** be externally synchronized

When the `[VK_KHR_incremental_present](../../appendices/extensions.html#VK_KHR_incremental_present)` extension is enabled,
additional fields **can** be specified that allow an application to specify
that only certain rectangular regions of the presentable images of a
swapchain are changed.
This is an optimization hint that a presentation engine **may** use to only
update the region of a surface that is actually changing.
The application still **must** ensure that all pixels of a presented image
contain the desired values, in case the presentation engine ignores this
hint.
An application **can** provide this hint by adding a `VkPresentRegionsKHR`
structure to the `pNext` chain of the `VkPresentInfoKHR` structure.

The `VkPresentRegionsKHR` structure is defined as:

// Provided by VK_KHR_incremental_present
typedef struct VkPresentRegionsKHR {
    VkStructureType              sType;
    const void*                  pNext;
    uint32_t                     swapchainCount;
    const VkPresentRegionKHR*    pRegions;
} VkPresentRegionsKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pRegions` is `NULL` or a pointer to an array of
`VkPresentRegionKHR` elements with `swapchainCount` entries.
If not `NULL`, each element of `pRegions` contains the region that
has changed since the last present to the swapchain in the corresponding
entry in the `VkPresentInfoKHR`::`pSwapchains` array.

Valid Usage

* 
[](#VUID-VkPresentRegionsKHR-swapchainCount-01260) VUID-VkPresentRegionsKHR-swapchainCount-01260

`swapchainCount` **must** be the same value as
`VkPresentInfoKHR`::`swapchainCount`, where
`VkPresentInfoKHR` is included in the `pNext` chain of this
`VkPresentRegionsKHR` structure

Valid Usage (Implicit)

* 
[](#VUID-VkPresentRegionsKHR-sType-sType) VUID-VkPresentRegionsKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_REGIONS_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentRegionsKHR-pRegions-parameter) VUID-VkPresentRegionsKHR-pRegions-parameter

 If `pRegions` is not `NULL`, `pRegions` **must** be a valid pointer to an array of `swapchainCount` valid [VkPresentRegionKHR](#VkPresentRegionKHR) structures

* 
[](#VUID-VkPresentRegionsKHR-swapchainCount-arraylength) VUID-VkPresentRegionsKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

For a given image and swapchain, the region to present is specified by the
`VkPresentRegionKHR` structure, which is defined as:

// Provided by VK_KHR_incremental_present
typedef struct VkPresentRegionKHR {
    uint32_t                 rectangleCount;
    const VkRectLayerKHR*    pRectangles;
} VkPresentRegionKHR;

* 
`rectangleCount` is the number of rectangles in `pRectangles`,
or zero if the entire image has changed and should be presented.

* 
`pRectangles` is either `NULL` or a pointer to an array of
`VkRectLayerKHR` structures.
The `VkRectLayerKHR` structure is the framebuffer coordinates, plus
layer, of a portion of a presentable image that has changed and **must** be
presented.
If non-`NULL`, each entry in `pRectangles` is a rectangle of the
given image that has changed since the last image was presented to the
given swapchain.
The rectangles **must** be specified relative to
[VkSurfaceCapabilitiesKHR](#VkSurfaceCapabilitiesKHR)::`currentTransform`, regardless of
the swapchain’s `preTransform`.
The presentation engine will apply the `preTransform` transformation
to the rectangles, along with any further transformation it applies to
the image content.

Valid Usage (Implicit)

* 
[](#VUID-VkPresentRegionKHR-pRectangles-parameter) VUID-VkPresentRegionKHR-pRectangles-parameter

 If `rectangleCount` is not `0`, and `pRectangles` is not `NULL`, `pRectangles` **must** be a valid pointer to an array of `rectangleCount` valid [VkRectLayerKHR](#VkRectLayerKHR) structures

The `VkRectLayerKHR` structure is defined as:

// Provided by VK_KHR_incremental_present
typedef struct VkRectLayerKHR {
    VkOffset2D    offset;
    VkExtent2D    extent;
    uint32_t      layer;
} VkRectLayerKHR;

* 
`offset` is the origin of the rectangle, in pixels.

* 
`extent` is the size of the rectangle, in pixels.

* 
`layer` is the layer of the image.
For images with only one layer, the value of `layer` **must** be 0.

Some platforms allow the size of a surface to change, and then scale the
pixels of the image to fit the surface.
`VkRectLayerKHR` specifies pixels of the swapchain’s image(s), which
will be constant for the life of the swapchain.

Valid Usage

* 
[](#VUID-VkRectLayerKHR-offset-04864) VUID-VkRectLayerKHR-offset-04864

The sum of `offset` and `extent`, after being transformed
according to the `preTransform` member of the
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure, **must** be no greater than the
`imageExtent` member of the [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure
passed to [vkCreateSwapchainKHR](#vkCreateSwapchainKHR)

* 
[](#VUID-VkRectLayerKHR-layer-01262) VUID-VkRectLayerKHR-layer-01262

`layer` **must** be less than the `imageArrayLayers` member of the
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure passed to
[vkCreateSwapchainKHR](#vkCreateSwapchainKHR)

When the `[VK_KHR_display_swapchain](../../appendices/extensions.html#VK_KHR_display_swapchain)` extension is enabled, additional
fields **can** be specified when presenting an image to a swapchain by setting
[VkPresentInfoKHR](#VkPresentInfoKHR)::`pNext` to point to a
[VkDisplayPresentInfoKHR](#VkDisplayPresentInfoKHR) structure.

The `VkDisplayPresentInfoKHR` structure is defined as:

// Provided by VK_KHR_display_swapchain
typedef struct VkDisplayPresentInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkRect2D           srcRect;
    VkRect2D           dstRect;
    VkBool32           persistent;
} VkDisplayPresentInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcRect` is a rectangular region of pixels to present.
It **must** be a subset of the image being presented.
If `VkDisplayPresentInfoKHR` is not specified, this region will be
assumed to be the entire presentable image.

* 
`dstRect` is a rectangular region within the visible region of the
swapchain’s display mode.
If `VkDisplayPresentInfoKHR` is not specified, this region will be
assumed to be the entire visible region of the swapchain’s mode.
If the specified rectangle is a subset of the display mode’s visible
region, content from display planes below the swapchain’s plane will be
visible outside the rectangle.
If there are no planes below the swapchain’s, the area outside the
specified rectangle will be black.
If portions of the specified rectangle are outside of the display’s
visible region, pixels mapping only to those portions of the rectangle
will be discarded.

* 
`persistent`: If this is [VK_TRUE](../fundamentals.html#VK_TRUE), the display engine will
enable buffered mode on displays that support it.
This allows the display engine to stop sending content to the display
until a new image is presented.
The display will instead maintain a copy of the last presented image.
This allows less power to be used, but **may** increase presentation
latency.
If `VkDisplayPresentInfoKHR` is not specified, persistent mode will
not be used.

If the extent of the `srcRect` and `dstRect` are not equal, the
presented pixels will be scaled accordingly.

Valid Usage

* 
[](#VUID-VkDisplayPresentInfoKHR-srcRect-01257) VUID-VkDisplayPresentInfoKHR-srcRect-01257

`srcRect` **must** specify a rectangular region that is a subset of the
image being presented

* 
[](#VUID-VkDisplayPresentInfoKHR-dstRect-01258) VUID-VkDisplayPresentInfoKHR-dstRect-01258

`dstRect` **must** specify a rectangular region that is a subset of the
`visibleRegion` parameter of the display mode the swapchain being
presented uses

* 
[](#VUID-VkDisplayPresentInfoKHR-persistentContent-01259) VUID-VkDisplayPresentInfoKHR-persistentContent-01259

If the `persistentContent` member of the
`VkDisplayPropertiesKHR` structure returned by
`vkGetPhysicalDeviceDisplayPropertiesKHR` for the display the
present operation targets is [VK_FALSE](../fundamentals.html#VK_FALSE), then `persistent` **must**
be [VK_FALSE](../fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPresentInfoKHR-sType-sType) VUID-VkDisplayPresentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PRESENT_INFO_KHR](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

If the `pNext` chain of [VkPresentInfoKHR](#VkPresentInfoKHR) includes a
`VkDeviceGroupPresentInfoKHR` structure, then that structure includes an
array of device masks and a device group present mode.

The `VkDeviceGroupPresentInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkDeviceGroupPresentInfoKHR {
    VkStructureType                        sType;
    const void*                            pNext;
    uint32_t                               swapchainCount;
    const uint32_t*                        pDeviceMasks;
    VkDeviceGroupPresentModeFlagBitsKHR    mode;
} VkDeviceGroupPresentInfoKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is zero or the number of elements in
`pDeviceMasks`.

* 
`pDeviceMasks` is a pointer to an array of device masks, one for
each element of [VkPresentInfoKHR](#VkPresentInfoKHR)::`pSwapchains`.

* 
`mode` is a [VkDeviceGroupPresentModeFlagBitsKHR](#VkDeviceGroupPresentModeFlagBitsKHR) value
specifying the device group present mode that will be used for this
present.

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then each
element of `pDeviceMasks` selects which instance of the swapchain image
is presented.
Each element of `pDeviceMasks` **must** have exactly one bit set, and the
corresponding physical device **must** have a presentation engine as reported
by [VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR).

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then
each element of `pDeviceMasks` selects which instance of the swapchain
image is presented.
Each element of `pDeviceMasks` **must** have exactly one bit set, and some
physical device in the logical device **must** include that bit in its
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`presentMask`.

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then each
element of `pDeviceMasks` selects which instances of the swapchain image
are component-wise summed and the sum of those images is presented.
If the sum in any component is outside the representable range, the value of
that component is **undefined**.
Each element of `pDeviceMasks` **must** have a value for which all set bits
are set in one of the elements of
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`presentMask`.

If `mode` is
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then each
element of `pDeviceMasks` selects which instance(s) of the swapchain
images are presented.
For each bit set in each element of `pDeviceMasks`, the corresponding
physical device **must** have a presentation engine as reported by
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR).

If `VkDeviceGroupPresentInfoKHR` is not provided or `swapchainCount`
is zero then the masks are considered to be `1`.
If `VkDeviceGroupPresentInfoKHR` is not provided, `mode` is
considered to be [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR).

Valid Usage

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-swapchainCount-01297) VUID-VkDeviceGroupPresentInfoKHR-swapchainCount-01297

`swapchainCount` **must** equal `0` or
[VkPresentInfoKHR](#VkPresentInfoKHR)::`swapchainCount`

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01298) VUID-VkDeviceGroupPresentInfoKHR-mode-01298

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then
each element of `pDeviceMasks` **must** have exactly one bit set, and
the corresponding element of
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`presentMask` **must** be
non-zero

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01299) VUID-VkDeviceGroupPresentInfoKHR-mode-01299

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then
each element of `pDeviceMasks` **must** have exactly one bit set, and
some physical device in the logical device **must** include that bit in its
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`presentMask`

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01300) VUID-VkDeviceGroupPresentInfoKHR-mode-01300

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then
each element of `pDeviceMasks` **must** have a value for which all set
bits are set in one of the elements of
[VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`presentMask`

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01301) VUID-VkDeviceGroupPresentInfoKHR-mode-01301

If `mode` is
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](#VkDeviceGroupPresentModeFlagBitsKHR), then for
each bit set in each element of `pDeviceMasks`, the corresponding
element of [VkDeviceGroupPresentCapabilitiesKHR](#VkDeviceGroupPresentCapabilitiesKHR)::`presentMask`
**must** be non-zero

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-01302) VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-01302

The value of each element of `pDeviceMasks` **must** be equal to the
device mask passed in [VkAcquireNextImageInfoKHR](#VkAcquireNextImageInfoKHR)::`deviceMask`
when the image index was last acquired

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01303) VUID-VkDeviceGroupPresentInfoKHR-mode-01303

`mode` **must** have exactly one bit set, and that bit **must** have been
included in [VkDeviceGroupSwapchainCreateInfoKHR](#VkDeviceGroupSwapchainCreateInfoKHR)::`modes`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-sType-sType) VUID-VkDeviceGroupPresentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-parameter) VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-parameter

 If `swapchainCount` is not `0`, `pDeviceMasks` **must** be a valid pointer to an array of `swapchainCount` `uint32_t` values

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-parameter) VUID-VkDeviceGroupPresentInfoKHR-mode-parameter

 `mode` **must** be a valid [VkDeviceGroupPresentModeFlagBitsKHR](#VkDeviceGroupPresentModeFlagBitsKHR) value

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

When the [`presentAtAbsoluteTime`](../features.html#features-presentAtAbsoluteTime) or
[`presentAtRelativeTime`](../features.html#features-presentAtRelativeTime) feature is
enabled, an application **can** instruct the presentation engine to attempt to
display an image at a specified time, or for a minimum duration, by
including the `VkPresentTimingsInfoEXT` structure in the `pNext`
chain of the [VkPresentInfoKHR](#VkPresentInfoKHR) structure.

The `VkPresentTimingsInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentTimingsInfoEXT {
    VkStructureType                  sType;
    const void*                      pNext;
    uint32_t                         swapchainCount;
    const VkPresentTimingInfoEXT*    pTimingInfos;
} VkPresentTimingsInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pTimingInfos` is `NULL` or a pointer to an array of
`VkPresentTimingInfoEXT` elements with `swapchainCount` entries.
If not `NULL`, each element of `pTimingInfos` contains timing
information for the presentation of the image corresponding to the entry
in the `VkPresentInfoKHR`::`pImageIndices` array.

Valid Usage

* 
[](#VUID-VkPresentTimingsInfoEXT-swapchainCount-12233) VUID-VkPresentTimingsInfoEXT-swapchainCount-12233

`swapchainCount` **must** be equal to
[VkPresentInfoKHR](#VkPresentInfoKHR)::`swapchainCount`

* 
[](#VUID-VkPresentTimingsInfoEXT-pSwapchains-12234) VUID-VkPresentTimingsInfoEXT-pSwapchains-12234

All swapchains in [VkPresentInfoKHR](#VkPresentInfoKHR)::`pSwapchains` **must** have
been created with the [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)::`flags` field
containing [VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](#VkSwapchainCreateFlagBitsKHR)

* 
[](#VUID-VkPresentTimingsInfoEXT-pSwapchains-12235) VUID-VkPresentTimingsInfoEXT-pSwapchains-12235

For each member of `VkPresentInfoKHR`::`pSwapchains`, if the
associated [VkPresentTimingInfoEXT](#VkPresentTimingInfoEXT)::`targetTime` is not zero,
the swapchain’s current present mode **must** be
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR),
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimingsInfoEXT-sType-sType) VUID-VkPresentTimingsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMINGS_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentTimingsInfoEXT-pTimingInfos-parameter) VUID-VkPresentTimingsInfoEXT-pTimingInfos-parameter

 If `pTimingInfos` is not `NULL`, `pTimingInfos` **must** be a valid pointer to an array of `swapchainCount` valid [VkPresentTimingInfoEXT](#VkPresentTimingInfoEXT) structures

* 
[](#VUID-VkPresentTimingsInfoEXT-swapchainCount-arraylength) VUID-VkPresentTimingsInfoEXT-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

The `VkPresentTimingInfoEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPresentTimingInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkPresentTimingInfoFlagsEXT    flags;
    uint64_t                       targetTime;
    uint64_t                       timeDomainId;
    VkPresentStageFlagsEXT         presentStageQueries;
    VkPresentStageFlagsEXT         targetTimeDomainPresentStage;
} VkPresentTimingInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPresentTimingInfoFlagBitsEXT](#VkPresentTimingInfoFlagBitsEXT)
specifying options for how to interpret the timing information.

* 
`targetTime` is zero or a value specifying the target present time
or duration, in nanoseconds, of the presentation request.

* 
`timeDomainId` is the id of the time domain used to specify the
absolute target present time and the timing results obtained in a
subsequent [vkGetPastPresentationTimingEXT](#vkGetPastPresentationTimingEXT) call for the current
presentation request.

* 
`presentStageQueries` is a valid [VkPresentStageFlagsEXT](#VkPresentStageFlagsEXT) value
indicating which present stages the presentation engine will collect
timing information for.

* 
`targetTimeDomainPresentStage` is a valid
[VkPresentStageFlagsEXT](#VkPresentStageFlagsEXT) specifying a single present stage used to
interpret `targetTime`.

If `targetTime` is not zero, the implementation attempts to align the
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](#VkPresentStageFlagBitsEXT) present stage of
that presentation request with the time specified in `targetTime`
according to the time domain used.
If [VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT](#VkPresentTimingInfoFlagBitsEXT) is
not set in `flags`, it indicates that the application would strictly
prefer the image to not be visible before `targetTime` has lapsed.

If `targetTime` is not zero and `timeDomainId` is associated with a
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](../synchronization.html#VkTimeDomainEXT) time domain,
`targetTimeDomainPresentStage` is used to specify which present stage’s
time domain `targetTime` is specified for.
Otherwise, `targetTimeDomainPresentStage` is ignored.

|  | Some platforms, due to hardware or system limitations, **may** not be able to
| --- | --- |
accurately time `targetTime` with the actual physical event of the image
becoming visible on the display.
However, those timing capabilities **may** still be useful and result in
improved animation quality.

As such, the [`presentAtAbsoluteTime`](../features.html#features-presentAtAbsoluteTime)
and [`presentAtRelativeTime`](../features.html#features-presentAtRelativeTime) features
do not provide a strict guarantee regarding the completion of the
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](#VkPresentStageFlagBitsEXT) present stage
relative to the `targetTime`, and implementations **must** strive to make
it as consistent and accurate as possible. |

|  | Applications that specify an absolute present time **should** regularly rebase
| --- | --- |
their calculations for their next target time on the feedback from
[vkGetPastPresentationTimingEXT](#vkGetPastPresentationTimingEXT) to compensate for accumulated precision
errors or potential clock drift.
It is recommended that when targeting the time of a vertical blanking
period, applications set
[VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT](#VkPresentTimingInfoFlagBitsEXT) to
allow the implementation to compensate for small precision errors that may
cause an image to be displayed one refresh cycle later than intended. |

Valid Usage

* 
[](#VUID-VkPresentTimingInfoEXT-targetTime-12236) VUID-VkPresentTimingInfoEXT-targetTime-12236

If `targetTime` is not zero and `flags` does not contain
[VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT](#VkPresentTimingInfoFlagBitsEXT), the
[`presentAtAbsoluteTime`](../features.html#features-presentAtAbsoluteTime) feature
**must** be enabled and the `presentAtAbsoluteTimeSupported` member of
the `VkPresentTimingSurfaceCapabilitiesEXT` returned by
`vkGetPhysicalDeviceSurfaceCapabilities2KHR` for the surface
associated with the swapchain **must** be [VK_TRUE](../fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPresentTimingInfoEXT-targetTime-12237) VUID-VkPresentTimingInfoEXT-targetTime-12237

If `targetTime` is not zero and `flags` contains
[VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT](#VkPresentTimingInfoFlagBitsEXT), the
[`presentAtRelativeTime`](../features.html#features-presentAtRelativeTime) feature
**must** be enabled and the `presentAtRelativeTimeSupported` member of
the `VkPresentTimingSurfaceCapabilitiesEXT` returned by
`vkGetPhysicalDeviceSurfaceCapabilities2KHR` for the surface
associated with the swapchain **must** be [VK_TRUE](../fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPresentTimingInfoEXT-timeDomainId-12238) VUID-VkPresentTimingInfoEXT-timeDomainId-12238

If `timeDomainId` is associated with a
[VK_TIME_DOMAIN_PRESENT_STAGE_LOCAL_EXT](../synchronization.html#VkTimeDomainEXT) time domain, and
`targetTime` is not zero, `targetTimeDomainPresentStage` **must**
be a single `VkPresentStageFlagsEXT` value

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimingInfoEXT-sType-sType) VUID-VkPresentTimingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMING_INFO_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentTimingInfoEXT-pNext-pNext) VUID-VkPresentTimingInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPresentTimingInfoEXT-flags-parameter) VUID-VkPresentTimingInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkPresentTimingInfoFlagBitsEXT](#VkPresentTimingInfoFlagBitsEXT) values

* 
[](#VUID-VkPresentTimingInfoEXT-presentStageQueries-parameter) VUID-VkPresentTimingInfoEXT-presentStageQueries-parameter

 `presentStageQueries` **must** be a valid combination of [VkPresentStageFlagBitsEXT](#VkPresentStageFlagBitsEXT) values

* 
[](#VUID-VkPresentTimingInfoEXT-targetTimeDomainPresentStage-parameter) VUID-VkPresentTimingInfoEXT-targetTimeDomainPresentStage-parameter

 `targetTimeDomainPresentStage` **must** be a valid combination of [VkPresentStageFlagBitsEXT](#VkPresentStageFlagBitsEXT) values

Bits which **can** be set in [VkPresentTimingInfoEXT](#VkPresentTimingInfoEXT)::`flags`,
specifying options for how to interpret timing information:

// Provided by VK_EXT_present_timing
typedef enum VkPresentTimingInfoFlagBitsEXT {
    VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT = 0x00000001,
    VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT = 0x00000002,
} VkPresentTimingInfoFlagBitsEXT;

* 
[VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT](#VkPresentTimingInfoFlagBitsEXT) specifies
that `VkPresentTimingInfoEXT`::`targetTime` is to be interpreted
as a relative time from the previous presentation’s
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](#VkPresentStageFlagBitsEXT) stage.
If the `swapchain` has never been used to present an image, the
provided `targetTime` is ignored.

* 
[VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT](#VkPresentTimingInfoFlagBitsEXT)
specifies that the application would prefer the image to be presented
earlier than the time specified in
`VkPresentTimingInfoEXT`::`targetTime` if that time falls within
the first half of a refresh cycle.
In that case, the presentation engine **may** choose to display the image
at the start of that refresh cycle.

// Provided by VK_EXT_present_timing
typedef VkFlags VkPresentTimingInfoFlagsEXT;

`VkPresentTimingInfoFlagsEXT` is a bitmask type for setting a mask of
zero or more [VkPresentTimingInfoFlagBitsEXT](#VkPresentTimingInfoFlagBitsEXT).

Presenting an image to the user typically involves multiple stages.
Bits which **can** be set to specify present stages are:

// Provided by VK_EXT_present_timing
typedef enum VkPresentStageFlagBitsEXT {
    VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT = 0x00000001,
    VK_PRESENT_STAGE_REQUEST_DEQUEUED_BIT_EXT = 0x00000002,
    VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_OUT_BIT_EXT = 0x00000004,
    VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT = 0x00000008,
} VkPresentStageFlagBitsEXT;

* 
[VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT](#VkPresentStageFlagBitsEXT) marks the end of the
set of queue operations enqueued by [vkQueuePresentKHR](#vkQueuePresentKHR) on the
provided `VkQueue` for a presentation request.

* 
[VK_PRESENT_STAGE_REQUEST_DEQUEUED_BIT_EXT](#VkPresentStageFlagBitsEXT) is the stage after which
the presentation request has been dequeued from the swapchain’s internal
presentation request queue, if any, as specified by the present mode
associated with that request.

* 
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_OUT_BIT_EXT](#VkPresentStageFlagBitsEXT) is the stage after
which data for the first pixel of the presentation request associated
with the image has left the presentation engine for a display hardware.

* 
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](#VkPresentStageFlagBitsEXT) is the stage
after which a display hardware has made the first pixel visible for the
presentation request associated with the image to be presented.

|  | The set of queue operations delimited by
| --- | --- |
[VK_PRESENT_STAGE_QUEUE_OPERATIONS_END_BIT_EXT](#VkPresentStageFlagBitsEXT) includes the wait for
the semaphores specified in [VkPresentInfoKHR](#VkPresentInfoKHR)::`pWaitSemaphores`,
if any, and any work implicitly enqueued by the implementation. |

// Provided by VK_EXT_present_timing
typedef VkFlags VkPresentStageFlagsEXT;

`VkPresentStageFlagsEXT` is a bitmask type for setting a mask of zero or
more [VkPresentStageFlagBitsEXT](#VkPresentStageFlagBitsEXT).

When the `[VK_GOOGLE_display_timing](../../appendices/extensions.html#VK_GOOGLE_display_timing)` extension is enabled, additional
fields **can** be specified that allow an application to specify the earliest
time that an image should be displayed.
This allows an application to avoid stutter that is caused by an image being
displayed earlier than planned.
Such stuttering can occur with both fixed and variable-refresh-rate
displays, because stuttering occurs when the geometry is not correctly
positioned for when the image is displayed.
An application **can** instruct the presentation engine that an image should
not be displayed earlier than a specified time by adding a
`VkPresentTimesInfoGOOGLE` structure to the `pNext` chain of the
`VkPresentInfoKHR` structure.

The `VkPresentTimesInfoGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkPresentTimesInfoGOOGLE {
    VkStructureType               sType;
    const void*                   pNext;
    uint32_t                      swapchainCount;
    const VkPresentTimeGOOGLE*    pTimes;
} VkPresentTimesInfoGOOGLE;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pTimes` is `NULL` or a pointer to an array of
`VkPresentTimeGOOGLE` elements with `swapchainCount` entries.
If not `NULL`, each element of `pTimes` contains the earliest time
to present the image corresponding to the entry in the
`VkPresentInfoKHR`::`pImageIndices` array.

Valid Usage

* 
[](#VUID-VkPresentTimesInfoGOOGLE-swapchainCount-01247) VUID-VkPresentTimesInfoGOOGLE-swapchainCount-01247

`swapchainCount` **must** be the same value as
`VkPresentInfoKHR`::`swapchainCount`, where
`VkPresentInfoKHR` is included in the `pNext` chain of this
`VkPresentTimesInfoGOOGLE` structure

Valid Usage (Implicit)

* 
[](#VUID-VkPresentTimesInfoGOOGLE-sType-sType) VUID-VkPresentTimesInfoGOOGLE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_TIMES_INFO_GOOGLE](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentTimesInfoGOOGLE-pTimes-parameter) VUID-VkPresentTimesInfoGOOGLE-pTimes-parameter

 If `pTimes` is not `NULL`, `pTimes` **must** be a valid pointer to an array of `swapchainCount` [VkPresentTimeGOOGLE](#VkPresentTimeGOOGLE) structures

* 
[](#VUID-VkPresentTimesInfoGOOGLE-swapchainCount-arraylength) VUID-VkPresentTimesInfoGOOGLE-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

The `VkPresentTimeGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkPresentTimeGOOGLE {
    uint32_t    presentID;
    uint64_t    desiredPresentTime;
} VkPresentTimeGOOGLE;

* 
`presentID` is an application-provided identification value, that
**can** be used with the results of
[vkGetPastPresentationTimingGOOGLE](#vkGetPastPresentationTimingGOOGLE), in order to uniquely identify
this present.
In order to be useful to the application, it **should** be unique within
some period of time that is meaningful to the application.

* 
`desiredPresentTime` specifies that the image given **should** not be
displayed to the user any earlier than this time.
`desiredPresentTime` is a time in nanoseconds, relative to a
monotonically-increasing clock (e.g. `CLOCK_MONOTONIC` (see
clock_gettime(2)) on Android and Linux).
A value of zero specifies that the presentation engine **may** display the
image at any time.
This is useful when the application desires to provide `presentID`,
but does not need a specific `desiredPresentTime`.

The `VkPresentIdKHR` structure is defined as:

// Provided by VK_KHR_present_id
typedef struct VkPresentIdKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           swapchainCount;
    const uint64_t*    pPresentIds;
} VkPresentIdKHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to the
[vkQueuePresentKHR](#vkQueuePresentKHR) command.

* 
`pPresentIds` is `NULL` or a pointer to an array of `uint64_t`
with `swapchainCount` entries.
If not `NULL`, each non-zero value in `pPresentIds` specifies the
present id to be associated with the presentation of the swapchain with
the same index in the [vkQueuePresentKHR](#vkQueuePresentKHR) call.

For applications to be able to reference specific presentation events queued
by a call to [vkQueuePresentKHR](#vkQueuePresentKHR), an identifier needs to be associated
with them.
When the [`presentId`](../features.html#features-presentId) feature is enabled,
applications **can** include the `VkPresentIdKHR` structure in the
`pNext` chain of the [VkPresentInfoKHR](#VkPresentInfoKHR) structure to supply
identifiers.

Each [VkSwapchainKHR](#VkSwapchainKHR) has a presentId associated with it.
This value is initially zero when the `VkSwapchainKHR` is created.

When a `VkPresentIdKHR` structure with a non-NULL `pPresentIds` is
included in the `pNext` chain of a [VkPresentInfoKHR](#VkPresentInfoKHR) structure,
each `pSwapchains` entry has a presentId associated in the
`pPresentIds` array at the same index as the swapchain in the
`pSwapchains` array.
If this presentId is non-zero, then the application **can** later use this
value to refer to that image presentation.
A value of zero indicates that this presentation has no associated
presentId.
A non-zero presentId **must** be greater than any non-zero presentId passed
previously by the application for the same swapchain.

There is no requirement for any precise timing relationship between the
presentation of the image to the user and the update of the presentId value,
but implementations **should** make this as close as possible to the
presentation of the first pixel in the new image to the user.

Valid Usage

* 
[](#VUID-VkPresentIdKHR-swapchainCount-04998) VUID-VkPresentIdKHR-swapchainCount-04998

`swapchainCount` **must** be the same value as
[VkPresentInfoKHR](#VkPresentInfoKHR)::`swapchainCount`, where this
`VkPresentIdKHR` is in the `pNext` chain of the
[VkPresentInfoKHR](#VkPresentInfoKHR) structure

* 
[](#VUID-VkPresentIdKHR-presentIds-04999) VUID-VkPresentIdKHR-presentIds-04999

Each non-zero entry in `presentIds` **must** be greater than all
previously submitted present ids for the associated swapchain in
[VkPresentInfoKHR](#VkPresentInfoKHR)::`pSwapchains`

Valid Usage (Implicit)

* 
[](#VUID-VkPresentIdKHR-sType-sType) VUID-VkPresentIdKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_ID_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentIdKHR-pPresentIds-parameter) VUID-VkPresentIdKHR-pPresentIds-parameter

 If `pPresentIds` is not `NULL`, `pPresentIds` **must** be a valid pointer to an array of `swapchainCount` `uint64_t` values

* 
[](#VUID-VkPresentIdKHR-swapchainCount-arraylength) VUID-VkPresentIdKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

When the [`presentWait`](../features.html#features-presentWait) feature is enabled, an
application **can** wait for an image to be presented to the user by first
specifying a presentId for the target presentation by adding a
[VkPresentIdKHR](#VkPresentIdKHR) structure to the `pNext` chain of the
[VkPresentInfoKHR](#VkPresentInfoKHR) structure and then waiting for that presentation to
complete by calling:

// Provided by VK_KHR_present_wait
VkResult vkWaitForPresentKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint64_t                                    presentId,
    uint64_t                                    timeout);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the non-retired swapchain on which an image was
queued for presentation.

* 
`presentId` is the presentation presentId to wait for.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

The call to `vkWaitForPresentKHR` will block until either the presentId
associated with `swapchain` is greater than or equal to `presentId`,
or `timeout` nanoseconds passes.
When the swapchain becomes OUT_OF_DATE, the call will either return
[VK_SUCCESS](../fundamentals.html#VkResult) (if the image was delivered to the presentation engine and
may have been presented to the user) or will return early with status
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) (if the image could not be presented to the
user).

There is no requirement for any precise timing relationship between the
presentation of the image to the user and the update of the presentId value,
but implementations **should** make this as close as possible to the
presentation of the first pixel in the next image being presented to the
user.

For [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR) (or other present mode where images
may be replaced in the presentation queue) any wait of this type associated
with such an image **must** be signaled no later than a wait associated with
the replacing image would be signaled.

As an exception to the normal rules for objects which are externally
synchronized, the `swapchain` passed to `vkWaitForPresentKHR` **may**
be simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](#vkDestroySwapchainKHR).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage

* 
[](#VUID-vkWaitForPresentKHR-swapchain-04997) VUID-vkWaitForPresentKHR-swapchain-04997

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkWaitForPresentKHR-presentWait-06234) VUID-vkWaitForPresentKHR-presentWait-06234

The [`presentWait`](../features.html#features-presentWait) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkWaitForPresentKHR-device-parameter) VUID-vkWaitForPresentKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWaitForPresentKHR-swapchain-parameter) VUID-vkWaitForPresentKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkWaitForPresentKHR-swapchain-parent) VUID-vkWaitForPresentKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

* 
[VK_TIMEOUT](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkPresentId2KHR` structure is defined as:

// Provided by VK_KHR_present_id2
typedef struct VkPresentId2KHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           swapchainCount;
    const uint64_t*    pPresentIds;
} VkPresentId2KHR;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to the
[vkQueuePresentKHR](#vkQueuePresentKHR) command.

* 
`pPresentIds` is `NULL` or a pointer to an array of uint64_t with
`swapchainCount` entries.
If not `NULL`, each non-zero value in `pPresentIds` specifies the
present id to be associated with the presentation of the swapchain with
the same index in the [vkQueuePresentKHR](#vkQueuePresentKHR) call.

For applications to be able to reference specific presentation events queued
by a call to [vkQueuePresentKHR](#vkQueuePresentKHR), an identifier needs to be associated
with them.

When the [VkSurfaceCapabilitiesPresentId2KHR](#VkSurfaceCapabilitiesPresentId2KHR) surface capability is
present for a surface, applications **can** include the `VkPresentId2KHR`
structure in the `pNext` chain of the [VkPresentInfoKHR](#VkPresentInfoKHR) structure
to associate an identifier with each presentation request.
The `pPresentIds` provides an identifier for the swapchain present at
the corresponding index in [VkPresentInfoKHR](#VkPresentInfoKHR)’s `pSwapchains` array.

If this presentId is non-zero, then the application **can** later use this
value to refer to that image presentation.
A value of zero indicates that this presentation has no associated
presentId.
A non-zero presentId **must** be greater than any non-zero presentId passed
previously by the application for the same swapchain.

If a non-zero presentId was provided, this may be used with
[vkWaitForPresent2KHR](#vkWaitForPresent2KHR) for the application to synchronize against the
presentation engine’s processing of the presentation request.

|  | The ID namespace used by this extension **must** be shared with other
| --- | --- |
extensions that allow the application to provide a 64-bit monotonically
increasing presentation ID, such as the original VK_KHR_present_id.

This is to allow existing extensions that depend on VK_KHR_present_id to use
VK_KHR_present_id2 provided IDs without change, as well as to simplify
writing future extensions that require application provided presentation
IDs. |

Valid Usage

* 
[](#VUID-VkPresentId2KHR-swapchainCount-10818) VUID-VkPresentId2KHR-swapchainCount-10818

`swapchainCount` **must** be the same value as
[VkPresentInfoKHR](#VkPresentInfoKHR)::`swapchainCount`, where this
`VkPresentId2KHR` is in the `pNext` chain of the
[VkPresentInfoKHR](#VkPresentInfoKHR) structure

* 
[](#VUID-VkPresentId2KHR-presentIds-10819) VUID-VkPresentId2KHR-presentIds-10819

Each non-zero entry in `presentIds` **must** be greater than all
previously submitted present ids for the associated swapchain in
[VkPresentInfoKHR](#VkPresentInfoKHR)::`pSwapchains`

* 
[](#VUID-VkPresentId2KHR-None-10820) VUID-VkPresentId2KHR-None-10820

The swapchain must have been created with
[VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) bit set in the
[VkSwapchainCreateFlagBitsKHR](#VkSwapchainCreateFlagBitsKHR) field

Valid Usage (Implicit)

* 
[](#VUID-VkPresentId2KHR-sType-sType) VUID-VkPresentId2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_ID_2_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkPresentId2KHR-pPresentIds-parameter) VUID-VkPresentId2KHR-pPresentIds-parameter

 If `pPresentIds` is not `NULL`, `pPresentIds` **must** be a valid pointer to an array of `swapchainCount` `uint64_t` values

* 
[](#VUID-VkPresentId2KHR-swapchainCount-arraylength) VUID-VkPresentId2KHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

When the `VkSurfaceCapabilitiesPresentWait2KHR` surface capability is
present for a given surface, an application **can** wait for an image to be
presented to the user by first specifying a `presentId` for the target
presentation by adding a `VkPresentId2KHR` structure to the `pNext`
chain of the [VkPresentInfoKHR](#VkPresentInfoKHR) structure and then waiting for that
presentation to complete by calling:

// Provided by VK_KHR_present_wait2
VkResult vkWaitForPresent2KHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkPresentWait2InfoKHR*                pPresentWait2Info);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the non-retired swapchain on which an image was
queued for presentation.

* 
`pPresentWait2Info` is a pointer to a [VkPresentWait2InfoKHR](#VkPresentWait2InfoKHR)
structure specifying the parameters of the wait.

`vkWaitForPresent2KHR` waits for the presentation engine to have begun
presentation of the presentation request associated with the
[VkPresentWait2InfoKHR](#VkPresentWait2InfoKHR)::`presentId` on `swapchain`, or for
[VkPresentWait2InfoKHR](#VkPresentWait2InfoKHR)::`timeout` to have expired.

The wait request will complete when the timeout expires, or after the
corresponding presentation request has either taken effect within the
presentation engine or has been replaced without presentation.

The timing relationship between the presentation of the image to the user
and the wait request completing is implementation-dependent due to
variations in window system implementations.

If the `swapchain` becomes [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) either before
or during this call, the call **may** either return [VK_SUCCESS](../fundamentals.html#VkResult) (if the
image was delivered to the presentation engine and **may** have been presented
to the user) or return early with status [VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult) (if
the image could not be presented to the user).

As an exception to the normal rules for objects which are externally
synchronized, the `swapchain` passed to `vkWaitForPresent2KHR` **may**
be simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](#vkDestroySwapchainKHR).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage

* 
[](#VUID-vkWaitForPresent2KHR-presentWait2-10814) VUID-vkWaitForPresent2KHR-presentWait2-10814

The [`presentWait2`](../features.html#features-presentWait2) feature **must** be
enabled

* 
[](#VUID-vkWaitForPresent2KHR-None-10815) VUID-vkWaitForPresent2KHR-None-10815

The [VkSurfaceCapabilitiesPresentWait2KHR](#VkSurfaceCapabilitiesPresentWait2KHR) surface capability **must**
be present for the underlying surface

* 
[](#VUID-vkWaitForPresent2KHR-None-10816) VUID-vkWaitForPresent2KHR-None-10816

The swapchain must have been created with
[VK_SWAPCHAIN_CREATE_PRESENT_WAIT_2_BIT_KHR](#VkSwapchainCreateFlagBitsKHR) bit set in the
[VkSwapchainCreateFlagBitsKHR](#VkSwapchainCreateFlagBitsKHR) field

* 
[](#VUID-vkWaitForPresent2KHR-presentId-10817) VUID-vkWaitForPresent2KHR-presentId-10817

The `presentId` value **must** have been associated with a
[vkQueuePresentKHR](#vkQueuePresentKHR) request on the `swapchain` which returned a
non-error value

Valid Usage (Implicit)

* 
[](#VUID-vkWaitForPresent2KHR-device-parameter) VUID-vkWaitForPresent2KHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWaitForPresent2KHR-swapchain-parameter) VUID-vkWaitForPresent2KHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkWaitForPresent2KHR-pPresentWait2Info-parameter) VUID-vkWaitForPresent2KHR-pPresentWait2Info-parameter

 `pPresentWait2Info` **must** be a valid pointer to a valid [VkPresentWait2InfoKHR](#VkPresentWait2InfoKHR) structure

* 
[](#VUID-vkWaitForPresent2KHR-swapchain-parent) VUID-vkWaitForPresent2KHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUBOPTIMAL_KHR](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

* 
[VK_TIMEOUT](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](../fundamentals.html#VkResult)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DATE_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

When the `[VK_GGP_frame_token](../../appendices/extensions.html#VK_GGP_frame_token)` extension is enabled, a Google Games
Platform frame token **can** be specified when presenting an image to a
swapchain by adding a `VkPresentFrameTokenGGP` structure to the
`pNext` chain of the `VkPresentInfoKHR` structure.

The `VkPresentFrameTokenGGP` structure is defined as:

// Provided by VK_GGP_frame_token
typedef struct VkPresentFrameTokenGGP {
    VkStructureType    sType;
    const void*        pNext;
    GgpFrameToken      frameToken;
} VkPresentFrameTokenGGP;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`frameToken` is the Google Games Platform frame token.

Valid Usage

* 
[](#VUID-VkPresentFrameTokenGGP-frameToken-02680) VUID-VkPresentFrameTokenGGP-frameToken-02680

`frameToken` **must** be a valid `GgpFrameToken`

Valid Usage (Implicit)

* 
[](#VUID-VkPresentFrameTokenGGP-sType-sType) VUID-VkPresentFrameTokenGGP-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRESENT_FRAME_TOKEN_GGP](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

The `VkSwapchainPresentModeInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentModeInfoKHR {
    VkStructureType            sType;
    const void*                pNext;
    uint32_t                   swapchainCount;
    const VkPresentModeKHR*    pPresentModes;
} VkSwapchainPresentModeInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentModeInfoKHR
typedef VkSwapchainPresentModeInfoKHR VkSwapchainPresentModeInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pPresentModes` is a list of presentation modes with
`swapchainCount` entries.

If the `pNext` chain of [VkPresentInfoKHR](#VkPresentInfoKHR) includes a
`VkSwapchainPresentModeInfoKHR` structure, then that structure defines
the presentation modes used for the current and subsequent presentation
operations.

When the application changes present modes with
[VkSwapchainPresentModeInfoKHR](#VkSwapchainPresentModeInfoKHR), images that have already been queued
for presentation will continue to be presented according to the previous
present mode.
The current image being queued for presentation and subsequent images will
be presented according to the new present mode.
The behavior during the transition between the two modes is defined as
follows.

* 
Transition from [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR) to
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR): the presentation engine
updates the shared presentable image according to the behavior of
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR).

* 
Transition from [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](#VkPresentModeKHR) to
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR): the presentation
engine **may** update the shared presentable image or defer that to its
regular refresh cycle, according to the behavior of
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](#VkPresentModeKHR).

* 
Transition between [VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) and
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR): Images continue to be appended
to the same FIFO queue, and the behavior with respect to waiting for
vertical blanking period will follow the new mode for current and
subsequent images.

* 
Transition from [VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR) to
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR)
or [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR)
: As all prior present requests in the
[VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR) mode are applied immediately, there
are no outstanding present operations in this mode, and current and
subsequent images are appended to the FIFO queue and presented according
to the new mode.

* 
Transition from [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR) to
[VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or [VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR)
or [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR)
: Presentation in FIFO modes require waiting for the next vertical
blanking period, with [VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR) allowing the
pending present operation to be replaced by a new one.
In this case, the current present operation will replace the pending
present operation and is applied according to the new mode.

* 
Transition from [VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR)
or [VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR)
to [VK_PRESENT_MODE_IMMEDIATE_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_MAILBOX_KHR](#VkPresentModeKHR): If the FIFO queue is empty,
presentation is done according to the behavior of the new mode.
If there are present operations in the FIFO queue, once the last present
operation is performed based on the respective vertical blanking period,
the current and subsequent updates are applied according to the new
mode.

* 
Transition between [VK_PRESENT_MODE_FIFO_KHR](#VkPresentModeKHR) or
[VK_PRESENT_MODE_FIFO_RELAXED_KHR](#VkPresentModeKHR), and
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](#VkPresentModeKHR): Images continue to be
appended to the same FIFO queue, and the behavior with respect to
waiting for vertical blanking period and dequeuing requests will follow
the new mode for current and subsequent images.

* 
The behavior during transition between any other present modes, if
possible, is implementation defined.

Valid Usage

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-07760) VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-07760

`swapchainCount` **must** be equal to
[VkPresentInfoKHR](#VkPresentInfoKHR)::`swapchainCount`

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-07761) VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-07761

Each entry in `pPresentModes` **must** be a presentation mode specified
in [VkSwapchainPresentModesCreateInfoKHR](#VkSwapchainPresentModesCreateInfoKHR)::`pPresentModes` when
creating the entry’s corresponding swapchain

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-sType-sType) VUID-VkSwapchainPresentModeInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-parameter) VUID-VkSwapchainPresentModeInfoKHR-pPresentModes-parameter

 `pPresentModes` **must** be a valid pointer to an array of `swapchainCount` valid [VkPresentModeKHR](#VkPresentModeKHR) values

* 
[](#VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-arraylength) VUID-VkSwapchainPresentModeInfoKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

The `VkSwapchainPresentFenceInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkSwapchainPresentFenceInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           swapchainCount;
    const VkFence*     pFences;
} VkSwapchainPresentFenceInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkSwapchainPresentFenceInfoKHR
typedef VkSwapchainPresentFenceInfoKHR VkSwapchainPresentFenceInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is the number of swapchains being presented to by
this command.

* 
`pFences` is a list of fences with `swapchainCount` entries.
Each entry **must** be [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) or the handle of a fence to
signal when the relevant operations on the associated swapchain have
completed.

The set of *queue operations* defined by queuing an image for presentation,
as well as operations performed by the presentation engine, access the
payloads of objects associated with the presentation operation.
The associated objects include:

* 
The swapchain image, its implicitly bound memory, and any other
resources bound to that memory.

* 
The wait semaphores specified when queuing the image for presentation.

The application **can** provide a fence that the implementation
will signal after all such queue operations have completed, and after the
presentation engine has taken a reference to the payloads of all objects
provided in `VkPresentInfoKHR`
that the presentation engine accesses as part of the present operation.
The fence **may** not wait for the present operation to complete.
For all
binary
wait semaphores imported by the presentation engine using the equivalent of
reference transference, as described in
[Importing Semaphore Payloads](../synchronization.html#synchronization-semaphores-importing), this
fence **must** not signal until all such semaphore payloads have been reset by
the presentation engine.

The application **can** destroy the wait semaphores associated with a given
presentation operation when at least one of the associated fences is
signaled, and **can** destroy the swapchain when the fences associated with all
past presentation requests referring to that swapchain have signaled.

Fences associated with presentations to the same swapchain on the same
[VkQueue](../devsandqueues.html#VkQueue) **must** be signaled in the same order as the present operations.

To specify a fence for each swapchain in a present operation, include the
`VkSwapchainPresentFenceInfoKHR` structure in the `pNext` chain of
the [VkPresentInfoKHR](#VkPresentInfoKHR) structure.

Valid Usage

* 
[](#VUID-VkSwapchainPresentFenceInfoKHR-swapchainCount-07757) VUID-VkSwapchainPresentFenceInfoKHR-swapchainCount-07757

`swapchainCount` **must** be equal to
[VkPresentInfoKHR](#VkPresentInfoKHR)::`swapchainCount`

* 
[](#VUID-VkSwapchainPresentFenceInfoKHR-pFences-07758) VUID-VkSwapchainPresentFenceInfoKHR-pFences-07758

Each element of `pFences` that is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be
unsignaled

* 
[](#VUID-VkSwapchainPresentFenceInfoKHR-pFences-07759) VUID-VkSwapchainPresentFenceInfoKHR-pFences-07759

Each element of `pFences` that is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) **must** not
be associated with any other queue command that has not yet completed
execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentFenceInfoKHR-sType-sType) VUID-VkSwapchainPresentFenceInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_FENCE_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSwapchainPresentFenceInfoKHR-pFences-parameter) VUID-VkSwapchainPresentFenceInfoKHR-pFences-parameter

 `pFences` **must** be a valid pointer to an array of `swapchainCount` valid or [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE) [VkFence](../synchronization.html#VkFence) handles

* 
[](#VUID-VkSwapchainPresentFenceInfoKHR-swapchainCount-arraylength) VUID-VkSwapchainPresentFenceInfoKHR-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)

To release images previously acquired through
[vkAcquireNextImage2KHR](#vkAcquireNextImage2KHR) or
[vkAcquireNextImageKHR](#vkAcquireNextImageKHR), call:

// Provided by VK_KHR_swapchain_maintenance1
VkResult vkReleaseSwapchainImagesKHR(
    VkDevice                                    device,
    const VkReleaseSwapchainImagesInfoKHR*      pReleaseInfo);

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to vkReleaseSwapchainImagesKHR
VkResult vkReleaseSwapchainImagesEXT(
    VkDevice                                    device,
    const VkReleaseSwapchainImagesInfoKHR*      pReleaseInfo);

* 
`device` is the device associated with
[VkReleaseSwapchainImagesInfoKHR](#VkReleaseSwapchainImagesInfoKHR)::`swapchain`.

* 
`pReleaseInfo` is a pointer to a
[VkReleaseSwapchainImagesInfoKHR](#VkReleaseSwapchainImagesInfoKHR) structure containing parameters of
the release.

Only images that are not in use by the device **can** be released.

Releasing images is a read-only operation that will not affect the content
of the released images.
Upon reacquiring the image, the image contents and its layout will be the
same as they were prior to releasing it.
However, if a mechanism other than Vulkan is used to modify the platform
window associated with the swapchain, the content of all presentable images
in the swapchain becomes **undefined**.

|  | This functionality is useful during swapchain recreation, where acquired
| --- | --- |
images from the old swapchain can be released instead of presented. |

Valid Usage

* 
[](#VUID-vkReleaseSwapchainImagesKHR-swapchainMaintenance1-10159) VUID-vkReleaseSwapchainImagesKHR-swapchainMaintenance1-10159

Feature [`swapchainMaintenance1`](../features.html#features-swapchainMaintenance1)
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseSwapchainImagesKHR-device-parameter) VUID-vkReleaseSwapchainImagesKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkReleaseSwapchainImagesKHR-pReleaseInfo-parameter) VUID-vkReleaseSwapchainImagesKHR-pReleaseInfo-parameter

 `pReleaseInfo` **must** be a valid pointer to a valid [VkReleaseSwapchainImagesInfoKHR](#VkReleaseSwapchainImagesInfoKHR) structure

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_SURFACE_LOST_KHR](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkReleaseSwapchainImagesInfoKHR` structure is defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkReleaseSwapchainImagesInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
    uint32_t           imageIndexCount;
    const uint32_t*    pImageIndices;
} VkReleaseSwapchainImagesInfoKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkReleaseSwapchainImagesInfoKHR
typedef VkReleaseSwapchainImagesInfoKHR VkReleaseSwapchainImagesInfoEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is a swapchain to which images are being released.

* 
`imageIndexCount` is the number of image indices to be released.

* 
`pImageIndices` is a pointer to an array of indices into the array
of `swapchain`’s presentable images, with `imageIndexCount`
entries.

Valid Usage

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07785) VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07785

Each element of `pImageIndices` **must** be the index of a presentable
image acquired from the swapchain specified by `swapchain`

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07786) VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-07786

All uses of presentable images identified by elements of
`pImageIndices` **must** have completed execution

Valid Usage (Implicit)

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-sType-sType) VUID-VkReleaseSwapchainImagesInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RELEASE_SWAPCHAIN_IMAGES_INFO_KHR](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pNext-pNext) VUID-VkReleaseSwapchainImagesInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-swapchain-parameter) VUID-VkReleaseSwapchainImagesInfoKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-parameter) VUID-VkReleaseSwapchainImagesInfoKHR-pImageIndices-parameter

 `pImageIndices` **must** be a valid pointer to an array of `imageIndexCount` `uint32_t` values

* 
[](#VUID-VkReleaseSwapchainImagesInfoKHR-imageIndexCount-arraylength) VUID-VkReleaseSwapchainImagesInfoKHR-imageIndexCount-arraylength

 `imageIndexCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

This section describes how to improve color reproduction of content to
better reproduce colors as seen on the display used to originally optimize
the content.

To provide HDR metadata to an implementation, call:

// Provided by VK_EXT_hdr_metadata
void vkSetHdrMetadataEXT(
    VkDevice                                    device,
    uint32_t                                    swapchainCount,
    const VkSwapchainKHR*                       pSwapchains,
    const VkHdrMetadataEXT*                     pMetadata);

* 
`device` is the logical device where the swapchain(s) were created.

* 
`swapchainCount` is the number of swapchains included in
`pSwapchains`.

* 
`pSwapchains` is a pointer to an array of `swapchainCount`
[VkSwapchainKHR](#VkSwapchainKHR) handles.

* 
`pMetadata` is a pointer to an array of `swapchainCount`
[VkHdrMetadataEXT](#VkHdrMetadataEXT) structures.

The metadata will be applied to the specified [VkSwapchainKHR](#VkSwapchainKHR) objects
at the next [vkQueuePresentKHR](#vkQueuePresentKHR) call using that [VkSwapchainKHR](#VkSwapchainKHR)
object.
The metadata will persist until a subsequent `vkSetHdrMetadataEXT`
changes it.

Valid Usage (Implicit)

* 
[](#VUID-vkSetHdrMetadataEXT-device-parameter) VUID-vkSetHdrMetadataEXT-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetHdrMetadataEXT-pSwapchains-parameter) VUID-vkSetHdrMetadataEXT-pSwapchains-parameter

 `pSwapchains` **must** be a valid pointer to an array of `swapchainCount` valid [VkSwapchainKHR](#VkSwapchainKHR) handles

* 
[](#VUID-vkSetHdrMetadataEXT-pMetadata-parameter) VUID-vkSetHdrMetadataEXT-pMetadata-parameter

 `pMetadata` **must** be a valid pointer to an array of `swapchainCount` valid [VkHdrMetadataEXT](#VkHdrMetadataEXT) structures

* 
[](#VUID-vkSetHdrMetadataEXT-swapchainCount-arraylength) VUID-vkSetHdrMetadataEXT-swapchainCount-arraylength

 `swapchainCount` **must** be greater than `0`

* 
[](#VUID-vkSetHdrMetadataEXT-pSwapchains-parent) VUID-vkSetHdrMetadataEXT-pSwapchains-parent

 Each element of `pSwapchains` **must** have been created, allocated, or retrieved from `device`

The `VkHdrMetadataEXT` structure is defined as:

// Provided by VK_EXT_hdr_metadata
typedef struct VkHdrMetadataEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkXYColorEXT       displayPrimaryRed;
    VkXYColorEXT       displayPrimaryGreen;
    VkXYColorEXT       displayPrimaryBlue;
    VkXYColorEXT       whitePoint;
    float              maxLuminance;
    float              minLuminance;
    float              maxContentLightLevel;
    float              maxFrameAverageLightLevel;
} VkHdrMetadataEXT;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayPrimaryRed` is a [VkXYColorEXT](#VkXYColorEXT) structure specifying the
red primary of the display used to optimize the content

* 
`displayPrimaryGreen` is a [VkXYColorEXT](#VkXYColorEXT) structure specifying
the green primary of the display used to optimize the content

* 
`displayPrimaryBlue` is a [VkXYColorEXT](#VkXYColorEXT) structure specifying
the blue primary of the display used to optimize the content

* 
`whitePoint` is a [VkXYColorEXT](#VkXYColorEXT) structure specifying the
white-point of the display used to optimize the content

* 
`maxLuminance` is the maximum luminance of the display used to
optimize the content in nits

* 
`minLuminance` is the minimum luminance of the display used to
optimize the content in nits

* 
`maxContentLightLevel` is the value in nits of the desired luminance
for the brightest pixels in the displayed image.

* 
`maxFrameAverageLightLevel` is the value in nits of the average
luminance of the frame which has the brightest average luminance
anywhere in the content.

If any of the above values are unknown, they **can** be set to 0.

|  | The meta-data provided here is intended to be used as defined in the SMPTE
| --- | --- |
2086, CTA 861.3 and CIE 15:2004 specifications.
The validity and use of this data is outside the scope of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-VkHdrMetadataEXT-sType-sType) VUID-VkHdrMetadataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HDR_METADATA_EXT](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkHdrMetadataEXT-pNext-pNext) VUID-VkHdrMetadataEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkHdrVividDynamicMetadataHUAWEI](#VkHdrVividDynamicMetadataHUAWEI)

* 
[](#VUID-VkHdrMetadataEXT-sType-unique) VUID-VkHdrMetadataEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

When [`hdrVivid`](../features.html#features-hdrVivid) feature is enabled, HDR Vivid
dynamic metadata **can** be set to control the reproduction of content by
including the `VkHdrVividDynamicMetadataHUAWEI` in the `pNext` chain
of [VkHdrMetadataEXT](#VkHdrMetadataEXT).

The `VkHdrVividDynamicMetadataHUAWEI` structure is defined as:

// Provided by VK_HUAWEI_hdr_vivid
typedef struct VkHdrVividDynamicMetadataHUAWEI {
    VkStructureType    sType;
    const void*        pNext;
    size_t             dynamicMetadataSize;
    const void*        pDynamicMetadata;
} VkHdrVividDynamicMetadataHUAWEI;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dynamicMetadataSize` is the size in bytes of the dynamic metadata.

* 
`pDynamicMetadata` is a pointer to the dynamic metadata.

|  | The HDR Vivid metadata is intended to be used as defined in the T/UWA
| --- | --- |
005.1-2022 specification.
The validity and use of this data is outside the scope of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-VkHdrVividDynamicMetadataHUAWEI-sType-sType) VUID-VkHdrVividDynamicMetadataHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HDR_VIVID_DYNAMIC_METADATA_HUAWEI](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkHdrVividDynamicMetadataHUAWEI-pDynamicMetadata-parameter) VUID-VkHdrVividDynamicMetadataHUAWEI-pDynamicMetadata-parameter

 `pDynamicMetadata` **must** be a valid pointer to an array of `dynamicMetadataSize` bytes

* 
[](#VUID-VkHdrVividDynamicMetadataHUAWEI-dynamicMetadataSize-arraylength) VUID-VkHdrVividDynamicMetadataHUAWEI-dynamicMetadataSize-arraylength

 `dynamicMetadataSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkHdrMetadataEXT](#VkHdrMetadataEXT)

The `VkXYColorEXT` structure is defined as:

// Provided by VK_EXT_hdr_metadata
typedef struct VkXYColorEXT {
    float    x;
    float    y;
} VkXYColorEXT;

* 
`x` is the x chromaticity coordinate.

* 
`y` is the y chromaticity coordinate.

Chromaticity coordinates are as specified in CIE 15:2004 “Calculation of
chromaticity coordinates” (Section 7.3) and are limited to between 0 and 1
for real colors.

Some implementations support extensions to reduce display latency and
control the swapchain present interval, as described in the remainder of
this section.

The [VK_AMD_anti_lag](../../appendices/extensions.html#VK_AMD_anti_lag) extension lowers latency between receiving input
and displaying on the screen.
It adds a command to indicate when input is being processed for a frame, and
when that frame’s images are presented.

To lower latency, call:

// Provided by VK_AMD_anti_lag
void vkAntiLagUpdateAMD(
    VkDevice                                    device,
    const VkAntiLagDataAMD*                     pData);

* 
`device` is the logical device

* 
`pData` is a pointer to a [VkAntiLagDataAMD](#VkAntiLagDataAMD) structure
containing latency reduction parameters.

This command should be executed immediately before the application processes
user input.
If `pData` is not `NULL` and
[VkAntiLagDataAMD](#VkAntiLagDataAMD)::`pPresentationInfo` is not `NULL`, this command
**should** be executed again before [vkQueuePresentKHR](#vkQueuePresentKHR), with
`pPresentationInfo` set to matching values.

Valid Usage

* 
[](#VUID-vkAntiLagUpdateAMD-antiLag-10061) VUID-vkAntiLagUpdateAMD-antiLag-10061

The [`antiLag`](../features.html#features-antiLag) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkAntiLagUpdateAMD-device-parameter) VUID-vkAntiLagUpdateAMD-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAntiLagUpdateAMD-pData-parameter) VUID-vkAntiLagUpdateAMD-pData-parameter

 `pData` **must** be a valid pointer to a valid [VkAntiLagDataAMD](#VkAntiLagDataAMD) structure

The `VkAntiLagDataAMD` structure is defined as:

// Provided by VK_AMD_anti_lag
typedef struct VkAntiLagDataAMD {
    VkStructureType                        sType;
    const void*                            pNext;
    VkAntiLagModeAMD                       mode;
    uint32_t                               maxFPS;
    const VkAntiLagPresentationInfoAMD*    pPresentationInfo;
} VkAntiLagDataAMD;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` is a [VkAntiLagModeAMD](#VkAntiLagModeAMD) value specifying the anti-lag
status.

* 
`maxFPS` is the framerate limit, in frames per second, used by the
application.
This limit will be imposed if anti-lag is enabled.
If the application tries to render faster, the framerate will be reduced
to match this limit.
A value of 0 will disable the limit.

* 
`pPresentationInfo` is a pointer to a
[VkAntiLagPresentationInfoAMD](#VkAntiLagPresentationInfoAMD) structure containing information
about the application stage.

This structure specifies anti-lag parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkAntiLagDataAMD-sType-sType) VUID-VkAntiLagDataAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANTI_LAG_DATA_AMD](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkAntiLagDataAMD-mode-parameter) VUID-VkAntiLagDataAMD-mode-parameter

 `mode` **must** be a valid [VkAntiLagModeAMD](#VkAntiLagModeAMD) value

* 
[](#VUID-VkAntiLagDataAMD-pPresentationInfo-parameter) VUID-VkAntiLagDataAMD-pPresentationInfo-parameter

 If `pPresentationInfo` is not `NULL`, `pPresentationInfo` **must** be a valid pointer to a valid [VkAntiLagPresentationInfoAMD](#VkAntiLagPresentationInfoAMD) structure

Possible values of [VkAntiLagDataAMD](#VkAntiLagDataAMD)::`mode`, specifying the
anti-lag status, are:

// Provided by VK_AMD_anti_lag
typedef enum VkAntiLagModeAMD {
    VK_ANTI_LAG_MODE_DRIVER_CONTROL_AMD = 0,
    VK_ANTI_LAG_MODE_ON_AMD = 1,
    VK_ANTI_LAG_MODE_OFF_AMD = 2,
} VkAntiLagModeAMD;

* 
[VK_ANTI_LAG_MODE_DRIVER_CONTROL_AMD](#VkAntiLagModeAMD) specifies that anti-lag will
be enabled or disabled depending on driver settings.

* 
[VK_ANTI_LAG_MODE_ON_AMD](#VkAntiLagModeAMD) specifies that anti-lag will be enabled.

* 
[VK_ANTI_LAG_MODE_OFF_AMD](#VkAntiLagModeAMD) specifies that anti-lag will be disabled.

The `VkAntiLagPresentationInfoAMD` structure is defined as:

// Provided by VK_AMD_anti_lag
typedef struct VkAntiLagPresentationInfoAMD {
    VkStructureType      sType;
    void*                pNext;
    VkAntiLagStageAMD    stage;
    uint64_t             frameIndex;
} VkAntiLagPresentationInfoAMD;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` is a [VkAntiLagStageAMD](#VkAntiLagStageAMD) value specifying the current
application stage.

* 
`frameIndex` is set just before the application processes input data
([VK_ANTI_LAG_STAGE_INPUT_AMD](#VkAntiLagStageAMD)).
The same `frameIndex` value **should** be set before the frame with
current input data will be presented by [vkQueuePresentKHR](#vkQueuePresentKHR)
([VK_ANTI_LAG_STAGE_PRESENT_AMD](#VkAntiLagStageAMD)).
This **should** be done for each frame.

This structure specifies information about the presentation stage for which
anti-lag parameters are being set.

Valid Usage (Implicit)

* 
[](#VUID-VkAntiLagPresentationInfoAMD-sType-sType) VUID-VkAntiLagPresentationInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANTI_LAG_PRESENTATION_INFO_AMD](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkAntiLagPresentationInfoAMD-stage-parameter) VUID-VkAntiLagPresentationInfoAMD-stage-parameter

 `stage` **must** be a valid [VkAntiLagStageAMD](#VkAntiLagStageAMD) value

Possible values of [VkAntiLagPresentationInfoAMD](#VkAntiLagPresentationInfoAMD)::`stage`,
specifying the current application stage, are:

// Provided by VK_AMD_anti_lag
typedef enum VkAntiLagStageAMD {
    VK_ANTI_LAG_STAGE_INPUT_AMD = 0,
    VK_ANTI_LAG_STAGE_PRESENT_AMD = 1,
} VkAntiLagStageAMD;

* 
[VK_ANTI_LAG_STAGE_INPUT_AMD](#VkAntiLagStageAMD) specifies the stage before processing
input.

* 
[VK_ANTI_LAG_STAGE_PRESENT_AMD](#VkAntiLagStageAMD) specifies the stage before
[vkQueuePresentKHR](#vkQueuePresentKHR).

To enable or disable low latency mode on a swapchain, call:

// Provided by VK_NV_low_latency2
VkResult vkSetLatencySleepModeNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkLatencySleepModeInfoNV*             pSleepModeInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to enable or disable low latency mode
on.

* 
`pSleepModeInfo` is `NULL` or a pointer to a
[VkLatencySleepModeInfoNV](#VkLatencySleepModeInfoNV) structure specifying the parameters of
the latency sleep mode.

If `pSleepModeInfo` is `NULL`, `vkSetLatencySleepModeNV` will
disable low latency mode, low latency boost, and set the minimum present
interval previously specified by [VkLatencySleepModeInfoNV](#VkLatencySleepModeInfoNV) to zero on
`swapchain`.
As an exception to the normal rules for objects which are externally
synchronized, the swapchain passed to `vkSetLatencySleepModeNV` **may** be
simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](#vkDestroySwapchainKHR).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage (Implicit)

* 
[](#VUID-vkSetLatencySleepModeNV-device-parameter) VUID-vkSetLatencySleepModeNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetLatencySleepModeNV-swapchain-parameter) VUID-vkSetLatencySleepModeNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkSetLatencySleepModeNV-pSleepModeInfo-parameter) VUID-vkSetLatencySleepModeNV-pSleepModeInfo-parameter

 `pSleepModeInfo` **must** be a valid pointer to a valid [VkLatencySleepModeInfoNV](#VkLatencySleepModeInfoNV) structure

* 
[](#VUID-vkSetLatencySleepModeNV-swapchain-parent) VUID-vkSetLatencySleepModeNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkLatencySleepModeInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySleepModeInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           lowLatencyMode;
    VkBool32           lowLatencyBoost;
    uint32_t           minimumIntervalUs;
} VkLatencySleepModeInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`lowLatencyMode` is the toggle to enable or disable low latency
mode.

* 
`lowLatencyBoost` allows an application to hint to the GPU to
increase performance to provide additional latency savings at a cost of
increased power consumption.

* 
`minimumIntervalUs` is the microseconds between
[vkQueuePresentKHR](#vkQueuePresentKHR) calls for a given swapchain that
[vkLatencySleepNV](#vkLatencySleepNV) will enforce.

If `lowLatencyMode` is [VK_FALSE](../fundamentals.html#VK_FALSE), `lowLatencyBoost` will still
hint to the GPU to increase its power state and `vkLatencySleepNV` will
still enforce `minimumIntervalUs` between `vkQueuePresentKHR` calls.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySleepModeInfoNV-sType-sType) VUID-VkLatencySleepModeInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SLEEP_MODE_INFO_NV](../fundamentals.html#VkStructureType)

To provide the synchronization primitive used to delay host CPU work for
lower latency rendering, call:

// Provided by VK_NV_low_latency2
VkResult vkLatencySleepNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkLatencySleepInfoNV*                 pSleepInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to delay associated CPU work based on
[VkLatencySubmissionPresentIdNV](#VkLatencySubmissionPresentIdNV) submissions.

* 
`pSleepInfo` is a pointer to a [VkLatencySleepInfoNV](#VkLatencySleepInfoNV) structure
specifying the parameters of the latency sleep.

`vkLatencySleepNV` returns immediately.
Applications **should** use [vkWaitSemaphores](../synchronization.html#vkWaitSemaphores) with
`pSleepInfo->signalSemaphore` to delay host CPU work.
CPU work refers to application work done before presenting which includes
but is not limited to: input sampling, simulation, command buffer recording,
command buffer submission, and present submission.
Applications **should** call this function before input sampling, and exactly
once between presents.

Valid Usage (Implicit)

* 
[](#VUID-vkLatencySleepNV-device-parameter) VUID-vkLatencySleepNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkLatencySleepNV-swapchain-parameter) VUID-vkLatencySleepNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkLatencySleepNV-pSleepInfo-parameter) VUID-vkLatencySleepNV-pSleepInfo-parameter

 `pSleepInfo` **must** be a valid pointer to a valid [VkLatencySleepInfoNV](#VkLatencySleepInfoNV) structure

* 
[](#VUID-vkLatencySleepNV-swapchain-parent) VUID-vkLatencySleepNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The `VkLatencySleepInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySleepInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkSemaphore        signalSemaphore;
    uint64_t           value;
} VkLatencySleepInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`signalSemaphore` is a semaphore that is signaled to indicate that
the application **should** resume input sampling work.

* 
`value` is the value that `signalSemaphore` is set to for
resuming sampling work.

Valid Usage

* 
[](#VUID-VkLatencySleepInfoNV-signalSemaphore-09361) VUID-VkLatencySleepInfoNV-signalSemaphore-09361

`signalSemaphore` **must** be a timeline semaphore

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySleepInfoNV-sType-sType) VUID-VkLatencySleepInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SLEEP_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkLatencySleepInfoNV-signalSemaphore-parameter) VUID-VkLatencySleepInfoNV-signalSemaphore-parameter

 `signalSemaphore` **must** be a valid [VkSemaphore](../synchronization.html#VkSemaphore) handle

An application **can** provide timestamps at various stages of its frame
generation work by calling:

// Provided by VK_NV_low_latency2
void vkSetLatencyMarkerNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkSetLatencyMarkerInfoNV*             pLatencyMarkerInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to capture timestamps on.

* 
`pSetLatencyMarkerInfo` is a pointer to a
[VkSetLatencyMarkerInfoNV](#VkSetLatencyMarkerInfoNV) structure specifying the parameters of
the marker to set.

At the beginning and end of simulation and render threads and beginning and
end of [vkQueuePresentKHR](#vkQueuePresentKHR) calls, `vkSetLatencyMarkerNV` **can** be
called to provide timestamps for the application’s reference.
These timestamps are returned with a call to [vkGetLatencyTimingsNV](#vkGetLatencyTimingsNV)
alongside driver provided timestamps at various points of interest with
regards to latency within the application.
As an exception to the normal rules for objects which are externally
synchronized, the swapchain passed to `vkSetLatencyMarkerNV` **may** be
simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](#vkDestroySwapchainKHR).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage (Implicit)

* 
[](#VUID-vkSetLatencyMarkerNV-device-parameter) VUID-vkSetLatencyMarkerNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetLatencyMarkerNV-swapchain-parameter) VUID-vkSetLatencyMarkerNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkSetLatencyMarkerNV-pLatencyMarkerInfo-parameter) VUID-vkSetLatencyMarkerNV-pLatencyMarkerInfo-parameter

 `pLatencyMarkerInfo` **must** be a valid pointer to a valid [VkSetLatencyMarkerInfoNV](#VkSetLatencyMarkerInfoNV) structure

* 
[](#VUID-vkSetLatencyMarkerNV-swapchain-parent) VUID-vkSetLatencyMarkerNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

The `VkSetLatencyMarkerInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkSetLatencyMarkerInfoNV {
    VkStructureType      sType;
    const void*          pNext;
    uint64_t             presentID;
    VkLatencyMarkerNV    marker;
} VkSetLatencyMarkerInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentID` is an application provided value that is used to
    associate the timestamp with a `vkQueuePresentKHR` command using
[VkPresentIdKHR](#VkPresentIdKHR)::`pPresentIds` or
[VkPresentId2KHR](#VkPresentId2KHR)::`pPresentIds`
    for a given present.

* 
`marker` is the type of timestamp to be recorded.

Valid Usage (Implicit)

* 
[](#VUID-VkSetLatencyMarkerInfoNV-sType-sType) VUID-VkSetLatencyMarkerInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SET_LATENCY_MARKER_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkSetLatencyMarkerInfoNV-marker-parameter) VUID-VkSetLatencyMarkerInfoNV-marker-parameter

 `marker` **must** be a valid [VkLatencyMarkerNV](#VkLatencyMarkerNV) value

The [VkLatencyMarkerNV](#VkLatencyMarkerNV) enum is defined as:

// Provided by VK_NV_low_latency2
typedef enum VkLatencyMarkerNV {
    VK_LATENCY_MARKER_SIMULATION_START_NV = 0,
    VK_LATENCY_MARKER_SIMULATION_END_NV = 1,
    VK_LATENCY_MARKER_RENDERSUBMIT_START_NV = 2,
    VK_LATENCY_MARKER_RENDERSUBMIT_END_NV = 3,
    VK_LATENCY_MARKER_PRESENT_START_NV = 4,
    VK_LATENCY_MARKER_PRESENT_END_NV = 5,
    VK_LATENCY_MARKER_INPUT_SAMPLE_NV = 6,
    VK_LATENCY_MARKER_TRIGGER_FLASH_NV = 7,
    VK_LATENCY_MARKER_OUT_OF_BAND_RENDERSUBMIT_START_NV = 8,
    VK_LATENCY_MARKER_OUT_OF_BAND_RENDERSUBMIT_END_NV = 9,
    VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_START_NV = 10,
    VK_LATENCY_MARKER_OUT_OF_BAND_PRESENT_END_NV = 11,
} VkLatencyMarkerNV;

The members of the [VkLatencyMarkerNV](#VkLatencyMarkerNV) are used as arguments for
[vkSetLatencyMarkerNV](#vkSetLatencyMarkerNV) in the use cases described below:

* 
[VK_LATENCY_MARKER_SIMULATION_START_NV](#VkLatencyMarkerNV) **should** be called at the
start of the simulation execution each frame, but after the call to
`vkLatencySleepNV`.

* 
[VK_LATENCY_MARKER_SIMULATION_END_NV](#VkLatencyMarkerNV) **should** be called at the end
of the simulation execution each frame.

* 
[VK_LATENCY_MARKER_RENDERSUBMIT_START_NV](#VkLatencyMarkerNV) **should** be called at the
beginning of the render submission execution each frame.
This **should** be wherever Vulkan API calls are made and **must** not span
into asynchronous rendering.

* 
[VK_LATENCY_MARKER_RENDERSUBMIT_END_NV](#VkLatencyMarkerNV) **should** be called at the end
of the render submission execution each frame.

* 
[VK_LATENCY_MARKER_PRESENT_START_NV](#VkLatencyMarkerNV) **should** be called just before
`vkQueuePresentKHR`.

* 
[VK_LATENCY_MARKER_PRESENT_END_NV](#VkLatencyMarkerNV) **should** be called when
`vkQueuePresentKHR` returns.

* 
[VK_LATENCY_MARKER_INPUT_SAMPLE_NV](#VkLatencyMarkerNV) **should** be called just before
the application gathers input data.

* 
[VK_LATENCY_MARKER_TRIGGER_FLASH_NV](#VkLatencyMarkerNV) **should** be called anywhere
between [VK_LATENCY_MARKER_SIMULATION_START_NV](#VkLatencyMarkerNV) and
[VK_LATENCY_MARKER_SIMULATION_END_NV](#VkLatencyMarkerNV) whenever a left mouse click
occurs.

To get an array containing the newest collected latency data, call:

// Provided by VK_NV_low_latency2
void vkGetLatencyTimingsNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkGetLatencyMarkerInfoNV*                   pLatencyMarkerInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to return data from.

* 
`pLatencyMarkerInfo` is a pointer to a
[VkGetLatencyMarkerInfoNV](#VkGetLatencyMarkerInfoNV) structure specifying the parameters for
returning latency information.

The timings returned by `vkGetLatencyTimingsNV` contain the timestamps
requested from [vkSetLatencyMarkerNV](#vkSetLatencyMarkerNV) and additional
implementation-specific markers defined in
[VkLatencyTimingsFrameReportNV](#VkLatencyTimingsFrameReportNV).

Valid Usage (Implicit)

* 
[](#VUID-vkGetLatencyTimingsNV-device-parameter) VUID-vkGetLatencyTimingsNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetLatencyTimingsNV-swapchain-parameter) VUID-vkGetLatencyTimingsNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](#VkSwapchainKHR) handle

* 
[](#VUID-vkGetLatencyTimingsNV-pLatencyMarkerInfo-parameter) VUID-vkGetLatencyTimingsNV-pLatencyMarkerInfo-parameter

 `pLatencyMarkerInfo` **must** be a valid pointer to a [VkGetLatencyMarkerInfoNV](#VkGetLatencyMarkerInfoNV) structure

* 
[](#VUID-vkGetLatencyTimingsNV-swapchain-parent) VUID-vkGetLatencyTimingsNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

The `VkGetLatencyMarkerInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkGetLatencyMarkerInfoNV {
    VkStructureType                   sType;
    const void*                       pNext;
    uint32_t                          timingCount;
    VkLatencyTimingsFrameReportNV*    pTimings;
} VkGetLatencyMarkerInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is either `NULL` or a pointer to a structure extending this
structure.

* 
`timingCount` is an integer related to the number of previous frames
of latency data available or queried, as described below.

* 
`pTimings` is either `NULL` or a pointer to an array of
[VkLatencyTimingsFrameReportNV](#VkLatencyTimingsFrameReportNV) structures.

If `pTimings` is `NULL` then the maximum number of queryable frame data
is returned in `timingCount`.
Otherwise, `timingCount` **must** be set by the application to the number
of elements in the `pTimings` array, and on return is overwritten with
the number of values actually written to `pTimings`.
The elements of `pTimings` are arranged in the order they were requested
in, with the oldest data in the first entry.

Valid Usage (Implicit)

* 
[](#VUID-VkGetLatencyMarkerInfoNV-sType-sType) VUID-VkGetLatencyMarkerInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GET_LATENCY_MARKER_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkGetLatencyMarkerInfoNV-pTimings-parameter) VUID-VkGetLatencyMarkerInfoNV-pTimings-parameter

 If `timingCount` is not `0`, and `pTimings` is not `NULL`, `pTimings` **must** be a valid pointer to an array of `timingCount` [VkLatencyTimingsFrameReportNV](#VkLatencyTimingsFrameReportNV) structures

The [VkLatencyTimingsFrameReportNV](#VkLatencyTimingsFrameReportNV) structure describes latency data
returned by [vkGetLatencyTimingsNV](#vkGetLatencyTimingsNV)

// Provided by VK_NV_low_latency2
typedef struct VkLatencyTimingsFrameReportNV {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           presentID;
    uint64_t           inputSampleTimeUs;
    uint64_t           simStartTimeUs;
    uint64_t           simEndTimeUs;
    uint64_t           renderSubmitStartTimeUs;
    uint64_t           renderSubmitEndTimeUs;
    uint64_t           presentStartTimeUs;
    uint64_t           presentEndTimeUs;
    uint64_t           driverStartTimeUs;
    uint64_t           driverEndTimeUs;
    uint64_t           osRenderQueueStartTimeUs;
    uint64_t           osRenderQueueEndTimeUs;
    uint64_t           gpuRenderStartTimeUs;
    uint64_t           gpuRenderEndTimeUs;
} VkLatencyTimingsFrameReportNV;

The members of the [VkLatencyTimingsFrameReportNV](#VkLatencyTimingsFrameReportNV) structure describe
the following:

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentID` is the application provided value that is used to
    associate the timestamp with a `vkQueuePresentKHR` command using
[VkPresentIdKHR](#VkPresentIdKHR)::`pPresentIds` or
[VkPresentId2KHR](#VkPresentId2KHR)::`pPresentIds`
    for a given present.

* 
`simStartTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](#VkLatencyMarkerNV)
enum [VK_LATENCY_MARKER_SIMULATION_START_NV](#VkLatencyMarkerNV).

* 
`simEndTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](#VkLatencyMarkerNV)
enum [VK_LATENCY_MARKER_SIMULATION_END_NV](#VkLatencyMarkerNV)

* 
`renderStartTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](#VkLatencyMarkerNV)
enum [VK_LATENCY_MARKER_RENDERSUBMIT_START_NV](#VkLatencyMarkerNV).

* 
`renderEndTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](#VkLatencyMarkerNV)
enum [VK_LATENCY_MARKER_RENDERSUBMIT_END_NV](#VkLatencyMarkerNV).

* 
`presentStartTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](#VkLatencyMarkerNV)
enum [VK_LATENCY_MARKER_PRESENT_START_NV](#VkLatencyMarkerNV).

* 
`presentEndTimeUs` is the timestamp written when
`vkSetLatencyMarkerNV` is called with the [VkLatencyMarkerNV](#VkLatencyMarkerNV)
enum [VK_LATENCY_MARKER_PRESENT_END_NV](#VkLatencyMarkerNV).

* 
`driverStartTimeUs` is the timestamp written when the first
`vkQueueSubmit` for the frame is called.

* 
`driverEndTimeUs` is the timestamp written when the final
`vkQueueSubmit` hands off from the Vulkan Driver.

* 
`osRenderQueueStartTimeUs` is the timestamp written when the final
`vkQueueSubmit` hands off from the Vulkan Driver.

* 
`osRenderQueueEndTimeUs` is the timestamp written when the first
submission reaches the GPU.

* 
`gpuRenderStartTimeUs` is the timestamp written when the first
submission reaches the GPU.

* 
`gpuRenderEndTimeUs` is the timestamp written when the final
submission finishes on the GPU for the frame.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencyTimingsFrameReportNV-sType-sType) VUID-VkLatencyTimingsFrameReportNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_TIMINGS_FRAME_REPORT_NV](../fundamentals.html#VkStructureType)

The [VkLatencySubmissionPresentIdNV](#VkLatencySubmissionPresentIdNV) structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySubmissionPresentIdNV {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           presentID;
} VkLatencySubmissionPresentIdNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentID` is used to associate the `vkQueueSubmit` with the
    presentId used for a given `vkQueuePresentKHR` via
[VkPresentIdKHR](#VkPresentIdKHR)::`pPresentIds` or
[VkPresentId2KHR](#VkPresentId2KHR)::`pPresentIds`.

For any submission to be tracked with low latency mode pacing, it needs to
be associated with other submissions in a given present.
To associate a submission with `presentID` for low latency mode, the
`pNext` chain of [vkQueueSubmit](../cmdbuffers.html#vkQueueSubmit) **must** include a
`VkLatencySubmissionPresentIdNV` structure.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySubmissionPresentIdNV-sType-sType) VUID-VkLatencySubmissionPresentIdNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SUBMISSION_PRESENT_ID_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubmitInfo](../cmdbuffers.html#VkSubmitInfo)

* 
[VkSubmitInfo2](../cmdbuffers.html#VkSubmitInfo2)

To mark a queue as *out of band*, so that all `vkQueueSubmit` calls on
the queue are ignored for latency evaluation, call:

// Provided by VK_NV_low_latency2
void vkQueueNotifyOutOfBandNV(
    VkQueue                                     queue,
    const VkOutOfBandQueueTypeInfoNV*           pQueueTypeInfo);

* 
`queue` is the VkQueue to be marked as out of band.

* 
`pQueueTypeInfo` is a pointer to a [VkOutOfBandQueueTypeInfoNV](#VkOutOfBandQueueTypeInfoNV)
structure specifying the queue type.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueNotifyOutOfBandNV-queue-parameter) VUID-vkQueueNotifyOutOfBandNV-queue-parameter

 `queue` **must** be a valid [VkQueue](../devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueNotifyOutOfBandNV-pQueueTypeInfo-parameter) VUID-vkQueueNotifyOutOfBandNV-pQueueTypeInfo-parameter

 `pQueueTypeInfo` **must** be a valid pointer to a valid [VkOutOfBandQueueTypeInfoNV](#VkOutOfBandQueueTypeInfoNV) structure

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

The [VkOutOfBandQueueTypeInfoNV](#VkOutOfBandQueueTypeInfoNV) structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkOutOfBandQueueTypeInfoNV {
    VkStructureType           sType;
    const void*               pNext;
    VkOutOfBandQueueTypeNV    queueType;
} VkOutOfBandQueueTypeInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueType` describes the usage of the queue to be marked as out of
band.

Valid Usage (Implicit)

* 
[](#VUID-VkOutOfBandQueueTypeInfoNV-sType-sType) VUID-VkOutOfBandQueueTypeInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OUT_OF_BAND_QUEUE_TYPE_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkOutOfBandQueueTypeInfoNV-queueType-parameter) VUID-VkOutOfBandQueueTypeInfoNV-queueType-parameter

 `queueType` **must** be a valid [VkOutOfBandQueueTypeNV](#VkOutOfBandQueueTypeNV) value

The [VkOutOfBandQueueTypeNV](#VkOutOfBandQueueTypeNV) enum is defined as:

// Provided by VK_NV_low_latency2
typedef enum VkOutOfBandQueueTypeNV {
    VK_OUT_OF_BAND_QUEUE_TYPE_RENDER_NV = 0,
    VK_OUT_OF_BAND_QUEUE_TYPE_PRESENT_NV = 1,
} VkOutOfBandQueueTypeNV;

The members of the [VkOutOfBandQueueTypeNV](#VkOutOfBandQueueTypeNV) are used to describe the
queue type in [VkOutOfBandQueueTypeInfoNV](#VkOutOfBandQueueTypeInfoNV) as described below:

* 
[VK_OUT_OF_BAND_QUEUE_TYPE_RENDER_NV](#VkOutOfBandQueueTypeNV) specifies that work will be
submitted to this queue.

* 
[VK_OUT_OF_BAND_QUEUE_TYPE_PRESENT_NV](#VkOutOfBandQueueTypeNV) specifies that this queue
will be presented from.

To allow low latency mode to be used by a swapchain, add a
`VkSwapchainLatencyCreateInfoNV` structure to the `pNext` chain of
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR).

The `VkSwapchainLatencyCreateInfoNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkSwapchainLatencyCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           latencyModeEnable;
} VkSwapchainLatencyCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`latencyModeEnable` is [VK_TRUE](../fundamentals.html#VK_TRUE) if the created swapchain will
utilize low latency mode, [VK_FALSE](../fundamentals.html#VK_FALSE) otherwise.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainLatencyCreateInfoNV-sType-sType) VUID-VkSwapchainLatencyCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_LATENCY_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

The `VkLatencySurfaceCapabilitiesNV` structure is defined as:

// Provided by VK_NV_low_latency2
typedef struct VkLatencySurfaceCapabilitiesNV {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             presentModeCount;
    VkPresentModeKHR*    pPresentModes;
} VkLatencySurfaceCapabilitiesNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentModeCount` is the number of presentation modes provided.

* 
`pPresentModes` is list of presentation modes optimized for use with
low latency mode with `presentModeCount` entries.

If `pPresentModes` is `NULL`, then the number of present modes that are
optimized for use with low latency mode returned in `presentModeCount`.
Otherwise, `presentModeCount` **must** be set by the application to the
number of elements in the `pPresentModes` array, and on return is
overwritten with the number of values actually written to
`pPresentModes`.
If the value of `presentModeCount` is less than the number of optimized
present modes, at most `presentModeCount` values will be written to
`pPresentModes`.

Valid Usage (Implicit)

* 
[](#VUID-VkLatencySurfaceCapabilitiesNV-sType-sType) VUID-VkLatencySurfaceCapabilitiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_LATENCY_SURFACE_CAPABILITIES_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkLatencySurfaceCapabilitiesNV-pPresentModes-parameter) VUID-VkLatencySurfaceCapabilitiesNV-pPresentModes-parameter

 If `presentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `presentModeCount` [VkPresentModeKHR](#VkPresentModeKHR) values

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSurfaceCapabilities2KHR](#VkSurfaceCapabilities2KHR)

The `[VK_NV_present_barrier](../../appendices/extensions.html#VK_NV_present_barrier)` extension allows applications to
synchronize corresponding presentation requests across multiple swapchains
using the *present barrier*.
A swapchain is said to be using the *present barrier* if the swapchain is
created by adding a [VkSwapchainPresentBarrierCreateInfoNV](#VkSwapchainPresentBarrierCreateInfoNV) structure to
the `pNext` chain of the [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) structure, and
setting
[VkSwapchainPresentBarrierCreateInfoNV](#VkSwapchainPresentBarrierCreateInfoNV)::`presentBarrierEnable` to
true.

A set of corresponding presentation requests is defined as exactly one
queued presentation request associated with each swapchain using the present
barrier, whether or not that queued request has executed.
A given presentation request is added, when created by calling
[vkQueuePresentKHR](#vkQueuePresentKHR) and specifying a swapchain using the present
barrier, either to the oldest existing set of corresponding requests for
which there is no existing member associated with the request’s swapchain,
or to a new set of corresponding requests if no such set exists.

A set of corresponding requests is said to be *full* when it contains one
request from each swapchain using the present barrier.
Queued presentation of an image to a swapchain using the *present barrier*
is *deferred* by the implementation until the set of corresponding requests
is full, and the visibility operations associated with all requests in that
set, as described by [vkQueuePresentKHR](#vkQueuePresentKHR), have completed.

Additionally, the set of swapchains using the present barrier can be in the
same process, or different processes running under the same operating
system.
And if the required synchronization hardware is connected and correctly
configured, this extension also supports applications to synchronize
corresponding presentation requests using the *present barrier* across
distributed systems.
However, the configuration mechanism of the required hardware is outside the
scope of the Vulkan specification and this extension.

The [VkSwapchainPresentBarrierCreateInfoNV](#VkSwapchainPresentBarrierCreateInfoNV) structure is defined as:

// Provided by VK_NV_present_barrier
typedef struct VkSwapchainPresentBarrierCreateInfoNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentBarrierEnable;
} VkSwapchainPresentBarrierCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`presentBarrierEnable` is a boolean value indicating a request for
using the *present barrier*.

If the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) does not include
this structure, the default value for `presentBarrierEnable` is
[VK_FALSE](../fundamentals.html#VK_FALSE), meaning the swapchain does not request to use the present
barrier.
Additionally, when recreating a swapchain that was using the present
barrier, and the `pNext` chain of [VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR) does
not include this structure, it means the swapchain will stop using the
present barrier.

Valid Usage (Implicit)

* 
[](#VUID-VkSwapchainPresentBarrierCreateInfoNV-sType-sType) VUID-VkSwapchainPresentBarrierCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_BARRIER_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSwapchainCreateInfoKHR](#VkSwapchainCreateInfoKHR)

Present Metering evenly paces out the next `numFramesPerBatch`
[vkQueuePresentKHR](#vkQueuePresentKHR) presents.
This gives smoother pacing between presents in applications with frame
generation integrations.

The `VkSetPresentConfigNV` structure is defined as:

// Provided by VK_NV_present_metering
typedef struct VkSetPresentConfigNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           numFramesPerBatch;
    uint32_t           presentConfigFeedback;
} VkSetPresentConfigNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`numFramesPerBatch` is the number of frames to batch

* 
`presentConfigFeedback` will return the success or error status

The metering configuration applies to all swapchains in the array in
[VkPresentInfoKHR](#VkPresentInfoKHR).
The configuration specified by `VkSetPresentConfigNV` applies to the
next `numFramesPerBatch` calls to [vkQueuePresentKHR](#vkQueuePresentKHR) and needs to
be updated every `numFramesPerBatch` presents.

Valid Usage

* 
[](#VUID-VkSetPresentConfigNV-numFramesPerBatch-10581) VUID-VkSetPresentConfigNV-numFramesPerBatch-10581

`numFramesPerBatch` **must** not be larger than 8

Valid Usage (Implicit)

* 
[](#VUID-VkSetPresentConfigNV-sType-sType) VUID-VkSetPresentConfigNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SET_PRESENT_CONFIG_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](#VkPresentInfoKHR)
