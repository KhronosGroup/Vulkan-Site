# vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT - Get acceleration structure opaque capture descriptor data

To get the opaque capture descriptor data for an acceleration structure,
call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
VkResult vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkAccelerationStructureCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureCaptureDescriptorDataInfoEXT](VkAccelerationStructureCaptureDescriptorDataInfoEXT.html) structure
specifying the acceleration structure.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-None-08088) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-None-08088

The [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-08089) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-08089

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`accelerationStructureCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-08090) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-08090

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCaptureDescriptorDataInfoEXT](VkAccelerationStructureCaptureDescriptorDataInfoEXT.html) structure

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureCaptureDescriptorDataInfoEXT](VkAccelerationStructureCaptureDescriptorDataInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
