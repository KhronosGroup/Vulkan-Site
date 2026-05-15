# VkPipelineBinaryKeyKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryKeyKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryKeyKHR - Structure specifying a key to a pipeline binary

The `VkPipelineBinaryKeyKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryKeyKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           keySize;
    uint8_t            key[VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR];
} VkPipelineBinaryKeyKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`keySize` is the size, in bytes, of valid data returned in
`key`.

* 
`key` is a buffer of opaque data specifying a pipeline binary key.

Any returned values beyond the first `keySize` bytes are **undefined**.
Implementations **must** return a `keySize` greater than 0, and
less-or-equal to [VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR](VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR.html).

Two keys are considered equal if `keySize` is equal and the first
`keySize` bytes of `key` compare equal.

Implementations **may** return a different `keySize` for different
binaries.

Implementations **should** ensure that `keySize` is large enough to
uniquely identify a pipeline binary.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryKeyKHR-sType-sType) VUID-VkPipelineBinaryKeyKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_KEY_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineBinaryKeyKHR-pNext-pNext) VUID-VkPipelineBinaryKeyKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryKeysAndDataKHR](VkPipelineBinaryKeysAndDataKHR.html), [VkStructureType](VkStructureType.html), [vkGetPipelineBinaryDataKHR](vkGetPipelineBinaryDataKHR.html), [vkGetPipelineKeyKHR](vkGetPipelineKeyKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryKeyKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
