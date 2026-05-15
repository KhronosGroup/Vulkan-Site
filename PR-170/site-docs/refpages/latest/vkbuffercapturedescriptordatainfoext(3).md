# VkBufferCaptureDescriptorDataInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCaptureDescriptorDataInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCaptureDescriptorDataInfoEXT - Structure specifying a buffer for descriptor capture

Information about the buffer to get descriptor buffer capture data for is
passed in a `VkBufferCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkBufferCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the `VkBuffer` handle of the buffer to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-08075) VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-08075

`buffer` **must** have been created with
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html) set in
[VkBufferCreateInfo](VkBufferCreateInfo.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkBufferCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkBufferCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-parameter) VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkBuffer](VkBuffer.html), [VkStructureType](VkStructureType.html), [vkGetBufferOpaqueCaptureDescriptorDataEXT](vkGetBufferOpaqueCaptureDescriptorDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkBufferCaptureDescriptorDataInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
