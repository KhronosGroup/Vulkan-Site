# VkPipelineBinaryHandlesInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryHandlesInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryHandlesInfoKHR - Structure containing newly created pipeline binaries

The `VkPipelineBinaryHandlesInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryHandlesInfoKHR {
    VkStructureType         sType;
    const void*             pNext;
    uint32_t                pipelineBinaryCount;
    VkPipelineBinaryKHR*    pPipelineBinaries;
} VkPipelineBinaryHandlesInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBinaryCount` is the number of binaries associated with this
pipeline or the number of entries in the `pPipelineBinaries` array.

* 
`pPipelineBinaries` is `NULL` or a pointer to an array of
[VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) handles in which the resulting pipeline
binaries are returned.

If `pPipelineBinaries` is `NULL`, the number of binaries that would be
created is returned in `pipelineBinaryCount`.
Otherwise, `pipelineBinaryCount` **must** be the number of entries in the
`pPipelineBinaries` array, and on return from
[vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html) `pipelineBinaryCount` is overwritten
with the number of handles actually written to `pPipelineBinaries`.
If the value of `pipelineBinaryCount` is less than the number of
binaries that would have been created, at most `pipelineBinaryCount`
handles will be written to `pPipelineBinaries` and [VK_INCOMPLETE](VkResult.html)
will be returned instead of [VK_SUCCESS](VkResult.html), to indicate that
`pPipelineBinaries` was not large enough to create all the binaries.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryHandlesInfoKHR-sType-sType) VUID-VkPipelineBinaryHandlesInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_HANDLES_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineBinaryHandlesInfoKHR-pNext-pNext) VUID-VkPipelineBinaryHandlesInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryHandlesInfoKHR-pPipelineBinaries-parameter) VUID-VkPipelineBinaryHandlesInfoKHR-pPipelineBinaries-parameter

 If `pipelineBinaryCount` is not `0`, and `pPipelineBinaries` is not `NULL`, `pPipelineBinaries` **must** be a valid pointer to an array of `pipelineBinaryCount` [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) handles

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html), [VkStructureType](VkStructureType.html), [vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryHandlesInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
