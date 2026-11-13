# VkPipelineTessellationDomainOriginStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineTessellationDomainOriginStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineTessellationDomainOriginStateCreateInfo - Structure specifying the orientation of the tessellation domain

The `VkPipelineTessellationDomainOriginStateCreateInfo` structure is
defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPipelineTessellationDomainOriginStateCreateInfo {
    VkStructureType               sType;
    const void*                   pNext;
    VkTessellationDomainOrigin    domainOrigin;
} VkPipelineTessellationDomainOriginStateCreateInfo;

// Provided by VK_KHR_maintenance2
// Equivalent to VkPipelineTessellationDomainOriginStateCreateInfo
typedef VkPipelineTessellationDomainOriginStateCreateInfo VkPipelineTessellationDomainOriginStateCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`domainOrigin` is a [VkTessellationDomainOrigin](VkTessellationDomainOrigin.html) value
controlling the origin of the tessellation domain space.

If the `VkPipelineTessellationDomainOriginStateCreateInfo` structure is
included in the `pNext` chain of
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html), it controls the origin of the
tessellation domain.
If this structure is not present, it is as if `domainOrigin` was
[VK_TESSELLATION_DOMAIN_ORIGIN_UPPER_LEFT](VkTessellationDomainOrigin.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineTessellationDomainOriginStateCreateInfo-sType-sType) VUID-VkPipelineTessellationDomainOriginStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineTessellationDomainOriginStateCreateInfo-domainOrigin-parameter) VUID-VkPipelineTessellationDomainOriginStateCreateInfo-domainOrigin-parameter

 `domainOrigin` **must** be a valid [VkTessellationDomainOrigin](VkTessellationDomainOrigin.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html)

[VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html), [VkTessellationDomainOrigin](VkTessellationDomainOrigin.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/tessellation.html#VkPipelineTessellationDomainOriginStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
