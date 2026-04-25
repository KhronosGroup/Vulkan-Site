# VkPipelineBinaryKeysAndDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryKeysAndDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryKeysAndDataKHR - Structure specifying arrays of key and data pairs

The `VkPipelineBinaryKeysAndDataKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryKeysAndDataKHR {
    uint32_t                          binaryCount;
    const VkPipelineBinaryKeyKHR*     pPipelineBinaryKeys;
    const VkPipelineBinaryDataKHR*    pPipelineBinaryData;
} VkPipelineBinaryKeysAndDataKHR;

* 
`binaryCount` is the size of the `pPipelineBinaryKeys` and
`pPipelineBinaryData` arrays

* 
`pPipelineBinaryKeys` is a pointer to an array of
[VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html) structures containing the pipeline binary
keys

* 
`pPipelineBinaryData` is a pointer to an array of
[VkPipelineBinaryDataKHR](VkPipelineBinaryDataKHR.html) structures containing the pipeline binary
data

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryKeys-parameter) VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryKeys-parameter

 `pPipelineBinaryKeys` **must** be a valid pointer to an array of `binaryCount` valid [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html) structures

* 
[](#VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryData-parameter) VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryData-parameter

 `pPipelineBinaryData` **must** be a valid pointer to an array of `binaryCount` valid [VkPipelineBinaryDataKHR](VkPipelineBinaryDataKHR.html) structures

* 
[](#VUID-VkPipelineBinaryKeysAndDataKHR-binaryCount-arraylength) VUID-VkPipelineBinaryKeysAndDataKHR-binaryCount-arraylength

 `binaryCount` **must** be greater than `0`

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html), [VkPipelineBinaryDataKHR](VkPipelineBinaryDataKHR.html), [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryKeysAndDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
