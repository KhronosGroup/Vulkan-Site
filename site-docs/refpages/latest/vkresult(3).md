# VkResult(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResult.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResult - Vulkan command return codes

While the core Vulkan API is not designed to capture incorrect usage, some
circumstances still require return codes.
Commands in Vulkan return their status via return codes that are in one of
two categories:

* 
Successful completion codes are returned when a command needs to
communicate success or status information.
All successful completion codes are non-negative values.

* 
Runtime error codes are returned when a command needs to communicate a
failure that could only be detected at runtime.
All runtime error codes are negative values.

All return codes in Vulkan are reported via [VkResult](#) return values.
The possible codes are:

// Provided by VK_VERSION_1_0
typedef enum VkResult {
    VK_SUCCESS = 0,
    VK_NOT_READY = 1,
    VK_TIMEOUT = 2,
    VK_EVENT_SET = 3,
    VK_EVENT_RESET = 4,
    VK_INCOMPLETE = 5,
    VK_ERROR_OUT_OF_HOST_MEMORY = -1,
    VK_ERROR_OUT_OF_DEVICE_MEMORY = -2,
    VK_ERROR_INITIALIZATION_FAILED = -3,
    VK_ERROR_DEVICE_LOST = -4,
    VK_ERROR_MEMORY_MAP_FAILED = -5,
    VK_ERROR_LAYER_NOT_PRESENT = -6,
    VK_ERROR_EXTENSION_NOT_PRESENT = -7,
    VK_ERROR_FEATURE_NOT_PRESENT = -8,
    VK_ERROR_INCOMPATIBLE_DRIVER = -9,
    VK_ERROR_TOO_MANY_OBJECTS = -10,
    VK_ERROR_FORMAT_NOT_SUPPORTED = -11,
    VK_ERROR_FRAGMENTED_POOL = -12,
    VK_ERROR_UNKNOWN = -13,
  // Provided by VK_VERSION_1_0
    VK_ERROR_VALIDATION_FAILED = -1000011001,
  // Provided by VK_VERSION_1_1
    VK_ERROR_OUT_OF_POOL_MEMORY = -1000069000,
  // Provided by VK_VERSION_1_1
    VK_ERROR_INVALID_EXTERNAL_HANDLE = -1000072003,
  // Provided by VK_VERSION_1_2
    VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS = -1000257000,
  // Provided by VK_VERSION_1_2
    VK_ERROR_FRAGMENTATION = -1000161000,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_COMPILE_REQUIRED = 1000297000,
  // Provided by VK_VERSION_1_4
    VK_ERROR_NOT_PERMITTED = -1000174001,
  // Provided by VK_KHR_surface
    VK_ERROR_SURFACE_LOST_KHR = -1000000000,
  // Provided by VK_KHR_surface
    VK_ERROR_NATIVE_WINDOW_IN_USE_KHR = -1000000001,
  // Provided by VK_KHR_swapchain
    VK_SUBOPTIMAL_KHR = 1000001003,
  // Provided by VK_KHR_swapchain
    VK_ERROR_OUT_OF_DATE_KHR = -1000001004,
  // Provided by VK_KHR_display_swapchain
    VK_ERROR_INCOMPATIBLE_DISPLAY_KHR = -1000003001,
  // Provided by VK_NV_glsl_shader
    VK_ERROR_INVALID_SHADER_NV = -1000012000,
  // Provided by VK_KHR_video_queue
    VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR = -1000023000,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR = -1000023001,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR = -1000023002,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR = -1000023003,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR = -1000023004,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR = -1000023005,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_ERROR_INVALID_DRM_FORMAT_MODIFIER_PLANE_LAYOUT_EXT = -1000158000,
  // Provided by VK_EXT_present_timing
    VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT = -1000208000,
  // Provided by VK_EXT_full_screen_exclusive
    VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT = -1000255000,
  // Provided by VK_KHR_deferred_host_operations
    VK_THREAD_IDLE_KHR = 1000268000,
  // Provided by VK_KHR_deferred_host_operations
    VK_THREAD_DONE_KHR = 1000268001,
  // Provided by VK_KHR_deferred_host_operations
    VK_OPERATION_DEFERRED_KHR = 1000268002,
  // Provided by VK_KHR_deferred_host_operations
    VK_OPERATION_NOT_DEFERRED_KHR = 1000268003,
  // Provided by VK_KHR_video_encode_queue
    VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR = -1000299000,
  // Provided by VK_EXT_image_compression_control
    VK_ERROR_COMPRESSION_EXHAUSTED_EXT = -1000338000,
  // Provided by VK_EXT_shader_object
    VK_INCOMPATIBLE_SHADER_BINARY_EXT = 1000482000,
  // Provided by VK_KHR_pipeline_binary
    VK_PIPELINE_BINARY_MISSING_KHR = 1000483000,
  // Provided by VK_KHR_pipeline_binary
    VK_ERROR_NOT_ENOUGH_SPACE_KHR = -1000483000,
  // Provided by VK_EXT_debug_report
    VK_ERROR_VALIDATION_FAILED_EXT = VK_ERROR_VALIDATION_FAILED,
  // Provided by VK_KHR_maintenance1
    VK_ERROR_OUT_OF_POOL_MEMORY_KHR = VK_ERROR_OUT_OF_POOL_MEMORY,
  // Provided by VK_KHR_external_memory
    VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR = VK_ERROR_INVALID_EXTERNAL_HANDLE,
  // Provided by VK_EXT_descriptor_indexing
    VK_ERROR_FRAGMENTATION_EXT = VK_ERROR_FRAGMENTATION,
  // Provided by VK_EXT_global_priority
    VK_ERROR_NOT_PERMITTED_EXT = VK_ERROR_NOT_PERMITTED,
  // Provided by VK_KHR_global_priority
    VK_ERROR_NOT_PERMITTED_KHR = VK_ERROR_NOT_PERMITTED,
  // Provided by VK_EXT_buffer_device_address
    VK_ERROR_INVALID_DEVICE_ADDRESS_EXT = VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS,
  // Provided by VK_KHR_buffer_device_address
    VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR = VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_PIPELINE_COMPILE_REQUIRED_EXT = VK_PIPELINE_COMPILE_REQUIRED,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_ERROR_PIPELINE_COMPILE_REQUIRED_EXT = VK_PIPELINE_COMPILE_REQUIRED,
  // Provided by VK_EXT_shader_object
  // VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT is a legacy alias
    VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT = VK_INCOMPATIBLE_SHADER_BINARY_EXT,
} VkResult;

Success Codes

* 
[VK_SUCCESS](#) Command successfully completed

* 
[VK_NOT_READY](#) A fence or query has not yet completed

* 
[VK_TIMEOUT](#) A wait operation has not completed in the specified
time

* 
[VK_EVENT_SET](#) An event is signaled

* 
[VK_EVENT_RESET](#) An event is unsignaled

* 
[VK_INCOMPLETE](#) A return array was too small for the result

* 
[VK_SUBOPTIMAL_KHR](#) A swapchain no longer matches the surface
properties exactly, but **can** still be used to present to the surface
successfully.

* 
[VK_THREAD_IDLE_KHR](#) A deferred operation is not complete but there
is currently no work for this thread to do at the time of this call.

* 
[VK_THREAD_DONE_KHR](#) A deferred operation is not complete but there
is no work remaining to assign to additional threads.

* 
[VK_OPERATION_DEFERRED_KHR](#) A deferred operation was requested and
at least some of the work was deferred.

* 
[VK_OPERATION_NOT_DEFERRED_KHR](#) A deferred operation was requested
and no operations were deferred.

* 
[VK_PIPELINE_COMPILE_REQUIRED](#) A requested pipeline creation would
have required compilation, but the application requested compilation to
not be performed.

* 
[VK_PIPELINE_BINARY_MISSING_KHR](#) The application attempted to create
a pipeline binary by querying an internal cache, but the internal cache
entry did not exist.

* 
[VK_INCOMPATIBLE_SHADER_BINARY_EXT](#) The provided binary shader code
is not compatible with this device.

|  | In the initial version of the `[VK_EXT_shader_object](VK_EXT_shader_object.html)` extension, this
| --- | --- |
return code was named [VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT](#) and
improperly described as an error code.
The name has been changed, but the old name is retained as an alias for
compatibility with old code. |

Error Codes

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](#) A host memory allocation has failed.

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](#) A device memory allocation has
failed.

* 
[VK_ERROR_INITIALIZATION_FAILED](#) Initialization of an object could
not be completed for implementation-specific reasons.

* 
[VK_ERROR_DEVICE_LOST](#) The logical or physical device has been lost.
See [Lost Device](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device)

* 
[VK_ERROR_MEMORY_MAP_FAILED](#) Mapping of a memory object has failed.

* 
[VK_ERROR_LAYER_NOT_PRESENT](#) A requested layer is not present or
could not be loaded.

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](#) A requested extension is not
supported.

* 
[VK_ERROR_FEATURE_NOT_PRESENT](#) A requested feature is not supported.

* 
[VK_ERROR_INCOMPATIBLE_DRIVER](#) The requested version of Vulkan is
not supported by the driver or is otherwise incompatible for
implementation-specific reasons.

* 
[VK_ERROR_TOO_MANY_OBJECTS](#) Too many objects of the type have
already been created.

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](#) A requested format is not supported
on this device.

* 
[VK_ERROR_FRAGMENTED_POOL](#) A pool allocation has failed due to
fragmentation of the pool’s memory.
This **must** only be returned if no attempt to allocate host or device
memory was made to accommodate the new allocation.
This **should** be returned in preference to
[VK_ERROR_OUT_OF_POOL_MEMORY](#), but only if the implementation is
certain that the pool allocation failure was due to fragmentation.

* 
[VK_ERROR_SURFACE_LOST_KHR](#) A surface is no longer available.

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](#) The requested window is already
in use by Vulkan or another API in a manner which prevents it from being
used again.

* 
[VK_ERROR_OUT_OF_DATE_KHR](#) A surface has changed in such a way that
it is no longer compatible with the swapchain, and further presentation
requests using the swapchain will fail.
Applications **must** query the new surface properties and recreate their
swapchain if they wish to continue presenting to the surface.

* 
[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](#) The display used by a swapchain
does not use the same presentable image layout, or is incompatible in a
way that prevents sharing an image.

* 
[VK_ERROR_INVALID_SHADER_NV](#) One or more shaders failed to compile
or link.
More details are reported back to the application via
`[VK_EXT_debug_report](VK_EXT_debug_report.html)` if enabled.

* 
[VK_ERROR_OUT_OF_POOL_MEMORY](#) A pool memory allocation has failed.
This **must** only be returned if no attempt to allocate host or device
memory was made to accommodate the new allocation.
If the failure was definitely due to fragmentation of the pool,
[VK_ERROR_FRAGMENTED_POOL](#) **should** be returned instead.

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](#) An external handle is not a valid
handle of the specified type.

* 
[VK_ERROR_FRAGMENTATION](#) A descriptor pool creation has failed due
to fragmentation.

* 
[VK_ERROR_INVALID_DEVICE_ADDRESS_EXT](#) A buffer creation failed
because the requested address is not available.

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](#) A buffer creation
or memory allocation
failed because the requested address is not available.
A shader group handle assignment failed because the requested shader
group handle information is no longer valid.

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](#) An operation on a
swapchain created with
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VkFullScreenExclusiveEXT.html) failed as it
did not have exclusive full-screen access.
This **may** occur due to implementation-dependent reasons, outside of the
application’s control.

* 
[VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT](#) A present operation on a
swapchain created with [VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)
failed due to insufficient space in the swapchain’s internal results
queue to hold requested present timing data.

* 
[VK_ERROR_VALIDATION_FAILED](#) A command failed because invalid usage
was detected by the implementation or a validation layer.
This **may** result in the command not being dispatched to the ICD.

* 
[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](#) An image creation failed
because internal resources required for compression are exhausted.
This **must** only be returned when fixed-rate compression is requested.

* 
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](#) The requested
[VkImageUsageFlags](VkImageUsageFlags.html) are not supported.

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](#) The requested
video picture layout is not supported.

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](#) A video profile
operation specified via
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation` is not supported.

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](#) Format parameters
in a requested [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) chain are not supported.

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](#) Codec-specific
parameters in a requested [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) chain are not
supported.

* 
[VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR](#) The specified video
Std header version is not supported.

* 
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](#) The specified Video Std
parameters do not adhere to the syntactic or semantic requirements of
the used video compression standard, or values derived from parameters
according to the rules defined by the used video compression standard do
not adhere to the capabilities of the video compression standard or the
implementation.

* 
[VK_ERROR_NOT_PERMITTED](#) The driver implementation has denied a
request to acquire a priority above the default priority
([VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT](VkQueueGlobalPriority.html)) because the application does
not have sufficient privileges.

* 
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](#) The application did not provide
enough space to return all the required data.

* 
[VK_ERROR_UNKNOWN](#) An unknown error has occurred; either the
application has provided invalid input, or an implementation failure has
occurred.

If a command returns a runtime error, unless otherwise specified any output
parameters will have **undefined** contents, except that if the output
parameter is a structure with `sType` and `pNext` fields, those
fields will be unmodified.
Any structures chained from `pNext` will also have **undefined** contents,
except that `sType` and `pNext` will be unmodified.

`VK_ERROR_OUT_OF_*_MEMORY` errors do not modify any currently existing
Vulkan objects.
Objects that have already been successfully created **can** still be used by
the application.

|  | As a general rule, `Free`, `Release`, and `Reset` commands do
| --- | --- |
not return [VK_ERROR_OUT_OF_HOST_MEMORY](#), while any other command with a
return code **may** return it.
Any exceptions from this rule are described for those commands. |

[VK_ERROR_UNKNOWN](#) will be returned by an implementation when an
unexpected error occurs that cannot be attributed to valid behavior of the
application and implementation.
Under these conditions, it **may** be returned from any command returning a
[VkResult](#).

|  | [VK_ERROR_UNKNOWN](#) is not expected to ever be returned if the
| --- | --- |
application behavior is valid, and if the implementation is bug-free.
If [VK_ERROR_UNKNOWN](#) is returned, the application should be checked
against the latest validation layers to verify correct behavior as much as
possible.
If no issues are identified it could be an implementation issue, and the
implementor should be contacted for support. |

Any command returning a [VkResult](#) **may** return
[VK_ERROR_VALIDATION_FAILED](#) if a violation of valid usage is detected.

Performance-critical commands generally do not have return codes.
If a runtime error occurs in such commands, the implementation will defer
reporting the error until a specified point.
For commands that record into command buffers (`vkCmd*`) runtime errors
are reported by `vkEndCommandBuffer`.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindMemoryStatus](VkBindMemoryStatus.html), [VkPresentInfoKHR](VkPresentInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkResult).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
