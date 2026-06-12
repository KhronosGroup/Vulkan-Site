# VkPhysicalDeviceMaintenance9PropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance9PropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance9PropertiesKHR - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance9

The `VkPhysicalDeviceMaintenance9PropertiesKHR` structure is defined as:

// Provided by VK_KHR_maintenance9
typedef struct VkPhysicalDeviceMaintenance9PropertiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    VkBool32                            image2DViewOf3DSparse;
    VkDefaultVertexAttributeValueKHR    defaultVertexAttributeValue;
} VkPhysicalDeviceMaintenance9PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 If the [    `image2DViewOf3D`](../../../../spec/latest/chapters/features.html#features-image2DViewOf3D) feature is enabled, `image2DViewOf3DSparse`
indicates whether the implementation supports binding a slice of a
sparse 3D image to a 2D image view.

* 
 `defaultVertexAttributeValue`
is a [VkDefaultVertexAttributeValueKHR](VkDefaultVertexAttributeValueKHR.html) that indicates what value
the implementation will return when the vertex shader reads unbound
vertex attributes.
Unbound attributes are those that have no corresponding
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)::`location` defined in the
bound graphics pipeline
or no corresponding
[VkVertexInputAttributeDescription2EXT](VkVertexInputAttributeDescription2EXT.html)::`location` set by the
most recent call to [vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html) when the state is
dynamic
.

If the `VkPhysicalDeviceMaintenance9PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance9PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance9PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance9](VK_KHR_maintenance9.html), `VkBool32`, [VkDefaultVertexAttributeValueKHR](VkDefaultVertexAttributeValueKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance9PropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
