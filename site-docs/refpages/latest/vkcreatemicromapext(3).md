# vkCreateMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateMicromapEXT - Create a new micromap object

To create a micromap, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCreateMicromapEXT(
    VkDevice                                    device,
    const VkMicromapCreateInfoEXT*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkMicromapEXT*                              pMicromap);

* 
`device` is the logical device that creates the micromap object.

* 
`pCreateInfo` is a pointer to a [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)
structure containing parameters affecting creation of the micromap.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pMicromap` is a pointer to a [VkMicromapEXT](VkMicromapEXT.html) handle in which
the resulting micromap object is returned.

Similar to other objects in Vulkan, the micromap creation merely creates an
object with a specific “shape”.
The type and quantity of geometry that can be built into a micromap is
determined by the parameters of [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html).

The micromap data is stored in the object referred to by
`VkMicromapCreateInfoEXT`::`buffer`.
Once memory has been bound to that buffer, it **must** be populated by micromap
build or micromap copy commands such as [vkCmdBuildMicromapsEXT](vkCmdBuildMicromapsEXT.html),
[vkBuildMicromapsEXT](vkBuildMicromapsEXT.html), [vkCmdCopyMicromapEXT](vkCmdCopyMicromapEXT.html), and
[vkCopyMicromapEXT](vkCopyMicromapEXT.html).

|  | The expected usage for a trace capture/replay tool is that it will serialize
| --- | --- |
and later deserialize the micromap data using micromap copy commands.
During capture the tool will use [vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html) or
[vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html) with a `mode` of
[VK_COPY_MICROMAP_MODE_SERIALIZE_EXT](VkCopyMicromapModeEXT.html), and
[vkCopyMemoryToMicromapEXT](vkCopyMemoryToMicromapEXT.html) or [vkCmdCopyMemoryToMicromapEXT](vkCmdCopyMemoryToMicromapEXT.html) with a
`mode` of [VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT](VkCopyMicromapModeEXT.html) during replay. |

The input buffers passed to micromap build commands will be referenced by
the implementation for the duration of the command.
Micromaps **must** be fully self-contained.
The application **can** reuse or free any memory which was used by the command
as an input or as scratch without affecting the results of a subsequent
acceleration structure build using the micromap or traversal of that
acceleration structure.

Valid Usage

* 
[](#VUID-vkCreateMicromapEXT-micromap-07430) VUID-vkCreateMicromapEXT-micromap-07430

The [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature **must** be enabled

* 
[](#VUID-vkCreateMicromapEXT-device-07432) VUID-vkCreateMicromapEXT-device-07432

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkCreateMicromapEXT-deviceAddress-07431) VUID-vkCreateMicromapEXT-deviceAddress-07431

If [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`deviceAddress` is not zero, the
[`micromapCaptureReplay`](../../../../spec/latest/chapters/features.html#features-micromapCaptureReplay) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateMicromapEXT-device-parameter) VUID-vkCreateMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateMicromapEXT-pCreateInfo-parameter) VUID-vkCreateMicromapEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html) structure

* 
[](#VUID-vkCreateMicromapEXT-pAllocator-parameter) VUID-vkCreateMicromapEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateMicromapEXT-pMicromap-parameter) VUID-vkCreateMicromapEXT-pMicromap-parameter

 `pMicromap` **must** be a valid pointer to a [VkMicromapEXT](VkMicromapEXT.html) handle

* 
[](#VUID-vkCreateMicromapEXT-device-queuecount) VUID-vkCreateMicromapEXT-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html), [VkMicromapEXT](VkMicromapEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkCreateMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
