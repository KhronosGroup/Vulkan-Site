# VkSamplerCaptureDescriptorDataInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerCaptureDescriptorDataInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerCaptureDescriptorDataInfoEXT - Structure specifying a sampler for descriptor capture

Information about the sampler to get descriptor buffer capture data for is
passed in a `VkSamplerCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkSamplerCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkSampler          sampler;
} VkSamplerCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampler` is the `VkSampler` handle of the sampler to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-08087) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-08087

`sampler` **must** have been created with
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkSamplerCreateFlagBits.html) set in
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkSamplerCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-parameter) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-parameter

 `sampler` **must** be a valid [VkSampler](VkSampler.html) handle

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkSampler](VkSampler.html), [VkStructureType](VkStructureType.html), [vkGetSamplerOpaqueCaptureDescriptorDataEXT](vkGetSamplerOpaqueCaptureDescriptorDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkSamplerCaptureDescriptorDataInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
