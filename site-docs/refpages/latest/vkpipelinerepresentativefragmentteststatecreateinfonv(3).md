# VkPipelineRepresentativeFragmentTestStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRepresentativeFragmentTestStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRepresentativeFragmentTestStateCreateInfoNV - Structure specifying representative fragment test

If the `pNext` chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) includes a
`VkPipelineRepresentativeFragmentTestStateCreateInfoNV` structure, then
that structure includes parameters controlling the representative fragment
test.

The `VkPipelineRepresentativeFragmentTestStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_representative_fragment_test
typedef struct VkPipelineRepresentativeFragmentTestStateCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           representativeFragmentTestEnable;
} VkPipelineRepresentativeFragmentTestStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`representativeFragmentTestEnable` controls whether the
representative fragment test is enabled.

If this structure is not included in the `pNext` chain,
`representativeFragmentTestEnable` is considered to be [VK_FALSE](VK_FALSE.html),
and the representative fragment test is disabled.

If the active fragment shader does not specify the `EarlyFragmentTests`
execution mode, the representative fragment shader test has no effect, even
if enabled.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRepresentativeFragmentTestStateCreateInfoNV-sType-sType) VUID-VkPipelineRepresentativeFragmentTestStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_REPRESENTATIVE_FRAGMENT_TEST_STATE_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_NV_representative_fragment_test](VK_NV_representative_fragment_test.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineRepresentativeFragmentTestStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
