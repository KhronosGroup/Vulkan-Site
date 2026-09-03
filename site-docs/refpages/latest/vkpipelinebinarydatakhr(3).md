# VkPipelineBinaryDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryDataKHR - Structure specifying data and length of a pipeline binary

The `VkPipelineBinaryDataKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryDataKHR {
    size_t    dataSize;
    void*     pData;
} VkPipelineBinaryDataKHR;

* 
`dataSize` is the size of the `pData` buffer in bytes.

* 
`pData` is a pointer to a buffer of `size` bytes that contains
pipeline binary data obtained from `vkGetPipelineBinaryDataKHR`.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryDataKHR-pData-parameter) VUID-VkPipelineBinaryDataKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-VkPipelineBinaryDataKHR-dataSize-arraylength) VUID-VkPipelineBinaryDataKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryKeysAndDataKHR](VkPipelineBinaryKeysAndDataKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
