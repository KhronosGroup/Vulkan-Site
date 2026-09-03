# VkBufferConstraintsInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferConstraintsInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferConstraintsInfoFUCHSIA - Structure buffer-based buffer collection constraints

The `VkBufferConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferConstraintsInfoFUCHSIA {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkBufferCreateInfo                          createInfo;
    VkFormatFeatureFlags                        requiredFormatFeatures;
    VkBufferCollectionConstraintsInfoFUCHSIA    bufferCollectionConstraints;
} VkBufferConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`createInfo` is a pointer to a [VkBufferCreateInfo](VkBufferCreateInfo.html) struct
describing the buffer attributes for the buffer collection

* 
`requiredFormatFeatures` is a bitmask of
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) required features of the buffers in the
buffer collection

* 
`bufferCollectionConstraints` is used to supply parameters for the
negotiation and allocation of the buffer collection

Valid Usage

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-06404) VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-06404

The `requiredFormatFeatures` bitmask of
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) **must** be chosen from among the buffer
compatible format features listed in
[buffer compatible format features](../../../../spec/latest/chapters/formats.html#buffer-compatible-format-features)

Valid Usage (Implicit)

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-sType-sType) VUID-VkBufferConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkBufferConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-createInfo-parameter) VUID-VkBufferConstraintsInfoFUCHSIA-createInfo-parameter

 `createInfo` **must** be a valid [VkBufferCreateInfo](VkBufferCreateInfo.html) structure

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter) VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter

 `requiredFormatFeatures` **must** be a valid combination of [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) values

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter) VUID-VkBufferConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter

 `bufferCollectionConstraints` **must** be a valid [VkBufferCollectionConstraintsInfoFUCHSIA](VkBufferCollectionConstraintsInfoFUCHSIA.html) structure

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionConstraintsInfoFUCHSIA](VkBufferCollectionConstraintsInfoFUCHSIA.html), [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkStructureType](VkStructureType.html), [vkSetBufferCollectionBufferConstraintsFUCHSIA](vkSetBufferCollectionBufferConstraintsFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferConstraintsInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
