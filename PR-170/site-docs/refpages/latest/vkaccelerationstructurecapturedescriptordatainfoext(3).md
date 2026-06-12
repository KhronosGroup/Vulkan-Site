# VkAccelerationStructureCaptureDescriptorDataInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureCaptureDescriptorDataInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureCaptureDescriptorDataInfoEXT - Structure specifying an acceleration structure for descriptor capture

Information about the acceleration structure to get descriptor buffer
capture data for is passed in a
`VkAccelerationStructureCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
typedef struct VkAccelerationStructureCaptureDescriptorDataInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkAccelerationStructureKHR    accelerationStructure;
    VkAccelerationStructureNV     accelerationStructureNV;
} VkAccelerationStructureCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` is the `VkAccelerationStructureKHR`
handle of the acceleration structure to get opaque capture data for.

* 
`accelerationStructureNV` is the `VkAccelerationStructureNV`
handle of the acceleration structure to get opaque capture data for.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08091) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08091

If `accelerationStructure` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then
`accelerationStructure` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html)
set in [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`createFlags`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08092) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08092

If `accelerationStructureNV` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then
`accelerationStructureNV` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkAccelerationStructureCreateFlagBitsKHR.html)
set in [VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html)::`info.flags`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08093) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08093

If `accelerationStructure` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then
`accelerationStructureNV` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08094) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08094

If `accelerationStructureNV` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then
`accelerationStructure` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-parameter) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-parameter) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-parameter

 If `accelerationStructureNV` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `accelerationStructureNV` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-commonparent) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-commonparent

 Both of `accelerationStructure`, and `accelerationStructureNV` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkStructureType](VkStructureType.html), [vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT](vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkAccelerationStructureCaptureDescriptorDataInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
