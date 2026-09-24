# VkDefaultVertexAttributeValueKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDefaultVertexAttributeValueKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDefaultVertexAttributeValueKHR - Values returned for unbound vertex attributes

The possible values returned by the implementation when the vertex shader
reads an unbound vertex attribute are:

// Provided by VK_KHR_maintenance9
typedef enum VkDefaultVertexAttributeValueKHR {
    VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ZERO_KHR = 0,
    VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ONE_KHR = 1,
} VkDefaultVertexAttributeValueKHR;

* 
[VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ZERO_KHR](#) - the
value read for an unbound vertex attribute is (0,0,0,0).

* 
[VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ONE_KHR](#) - the
value read for an unbound vertex attribute is (0,0,0,1).

[VK_KHR_maintenance9](VK_KHR_maintenance9.html), [VkPhysicalDeviceMaintenance9PropertiesKHR](VkPhysicalDeviceMaintenance9PropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkDefaultVertexAttributeValueKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
