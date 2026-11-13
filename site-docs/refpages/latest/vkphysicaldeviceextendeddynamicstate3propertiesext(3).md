# VkPhysicalDeviceExtendedDynamicState3PropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExtendedDynamicState3PropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExtendedDynamicState3PropertiesEXT - Structure describing capabilities of extended dynamic state

The `VkPhysicalDeviceExtendedDynamicState3PropertiesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state3
typedef struct VkPhysicalDeviceExtendedDynamicState3PropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicPrimitiveTopologyUnrestricted;
} VkPhysicalDeviceExtendedDynamicState3PropertiesEXT;

* 

`dynamicPrimitiveTopologyUnrestricted` indicates that the
implementation allows `vkCmdSetPrimitiveTopology` to use a different
[primitive topology class](../../../../spec/latest/chapters/drawing.html#drawing-primitive-topology-class) to the
one specified in the active graphics pipeline.

If the `VkPhysicalDeviceExtendedDynamicState3PropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicState3PropertiesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicState3PropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceExtendedDynamicState3PropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
