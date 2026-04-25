# VkSpecializationMapEntry(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSpecializationMapEntry.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSpecializationMapEntry - Structure specifying a specialization map entry

The `VkSpecializationMapEntry` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSpecializationMapEntry {
    uint32_t    constantID;
    uint32_t    offset;
    size_t      size;
} VkSpecializationMapEntry;

* 
`constantID` is the ID of the specialization constant in SPIR-V.

* 
`offset` is the byte offset of the specialization constant value
within the supplied data buffer.

* 
`size` is the byte size of the specialization constant value within
the supplied data buffer.

If a `constantID` value is not a specialization constant ID used in the
shader, that map entry does not affect the behavior of the pipeline.

Valid Usage

* 
[](#VUID-VkSpecializationMapEntry-constantID-00776) VUID-VkSpecializationMapEntry-constantID-00776

For a `constantID` specialization constant declared in a shader,
`size` **must** match the byte size of the `constantID`.
If the specialization constant is of type `boolean`, `size` **must**
be the byte size of `VkBool32`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSpecializationInfo](VkSpecializationInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkSpecializationMapEntry).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
