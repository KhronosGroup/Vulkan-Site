# VkTessellationDomainOrigin(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTessellationDomainOrigin.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTessellationDomainOrigin - Enum describing tessellation domain origin

The possible tessellation domain origins are specified by the
[VkTessellationDomainOrigin](#) enumeration:

// Provided by VK_VERSION_1_1
typedef enum VkTessellationDomainOrigin {
    VK_TESSELLATION_DOMAIN_ORIGIN_UPPER_LEFT = 0,
    VK_TESSELLATION_DOMAIN_ORIGIN_LOWER_LEFT = 1,
  // Provided by VK_KHR_maintenance2
    VK_TESSELLATION_DOMAIN_ORIGIN_UPPER_LEFT_KHR = VK_TESSELLATION_DOMAIN_ORIGIN_UPPER_LEFT,
  // Provided by VK_KHR_maintenance2
    VK_TESSELLATION_DOMAIN_ORIGIN_LOWER_LEFT_KHR = VK_TESSELLATION_DOMAIN_ORIGIN_LOWER_LEFT,
} VkTessellationDomainOrigin;

// Provided by VK_KHR_maintenance2
// Equivalent to VkTessellationDomainOrigin
typedef VkTessellationDomainOrigin VkTessellationDomainOriginKHR;

* 
[VK_TESSELLATION_DOMAIN_ORIGIN_UPPER_LEFT](#) specifies that the origin
of the domain space is in the upper left corner, as shown in figure
[Figure 15. Domain parameterization for tessellation primitive modes (upper-left origin)](../../../../spec/latest/chapters/tessellation.html#img-tessellation-topology-ul).

* 
[VK_TESSELLATION_DOMAIN_ORIGIN_LOWER_LEFT](#) specifies that the origin
of the domain space is in the lower left corner, as shown in figure
[Figure 16. Domain parameterization for tessellation primitive modes (lower-left origin)](../../../../spec/latest/chapters/tessellation.html#img-tessellation-topology-ll).

This enum affects how the `VertexOrderCw` and `VertexOrderCcw`
tessellation execution modes are interpreted, since the winding is defined
relative to the orientation of the domain.

[VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPipelineTessellationDomainOriginStateCreateInfo](VkPipelineTessellationDomainOriginStateCreateInfo.html), [vkCmdSetTessellationDomainOriginEXT](vkCmdSetTessellationDomainOriginEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/tessellation.html#VkTessellationDomainOrigin).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
