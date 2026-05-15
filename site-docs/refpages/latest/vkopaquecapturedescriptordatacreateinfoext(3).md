# VkOpaqueCaptureDescriptorDataCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpaqueCaptureDescriptorDataCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpaqueCaptureDescriptorDataCreateInfoEXT - Structure specifying opaque capture descriptor data

The `VkOpaqueCaptureDescriptorDataCreateInfoEXT` structure is defined
as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkOpaqueCaptureDescriptorDataCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const void*        opaqueCaptureDescriptorData;
} VkOpaqueCaptureDescriptorDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureDescriptorData` is a pointer to an
application-allocated buffer containing opaque capture data retrieved
using [vkGetBufferOpaqueCaptureDescriptorDataEXT](vkGetBufferOpaqueCaptureDescriptorDataEXT.html),
[vkGetImageOpaqueCaptureDescriptorDataEXT](vkGetImageOpaqueCaptureDescriptorDataEXT.html),
[vkGetImageViewOpaqueCaptureDescriptorDataEXT](vkGetImageViewOpaqueCaptureDescriptorDataEXT.html),
[vkGetTensorOpaqueCaptureDescriptorDataARM](vkGetTensorOpaqueCaptureDescriptorDataARM.html),
[vkGetTensorViewOpaqueCaptureDescriptorDataARM](vkGetTensorViewOpaqueCaptureDescriptorDataARM.html),
[vkGetSamplerOpaqueCaptureDescriptorDataEXT](vkGetSamplerOpaqueCaptureDescriptorDataEXT.html), or
[vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT](vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT.html).

During replay, opaque descriptor capture data **can** be specified by adding a
`VkOpaqueCaptureDescriptorDataCreateInfoEXT` structure to the relevant
`pNext` chain of a [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkImageCreateInfo](VkImageCreateInfo.html),
[VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html),
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html), [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html),
[VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html) or
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) structure.

When providing opaque capture data for an image, if the `pNext` chain of
[VkImageCreateInfo](VkImageCreateInfo.html)
or [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)
contains an instance of both this structure and
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html), they **should** both specify data from
the same original resource.
If they have capture data from different original resources, resource
creation is much more likely to fail.

Valid Usage (Implicit)

* 
[](#VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-sType-sType) VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DESCRIPTOR_DATA_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-opaqueCaptureDescriptorData-parameter) VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-opaqueCaptureDescriptorData-parameter

 `opaqueCaptureDescriptorData` **must** be a pointer value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html)

* 
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)

* 
[VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

* 
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)

* 
[VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
