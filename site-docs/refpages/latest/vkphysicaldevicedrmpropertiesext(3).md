# VkPhysicalDeviceDrmPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDrmPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDrmPropertiesEXT - Structure containing DRM information of a physical device

The `VkPhysicalDeviceDrmPropertiesEXT` structure is defined as:

// Provided by VK_EXT_physical_device_drm
typedef struct VkPhysicalDeviceDrmPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hasPrimary;
    VkBool32           hasRender;
    int64_t            primaryMajor;
    int64_t            primaryMinor;
    int64_t            renderMajor;
    int64_t            renderMinor;
} VkPhysicalDeviceDrmPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hasPrimary` is a boolean indicating whether the physical device has
a DRM primary node.

* 
`hasRender` is a boolean indicating whether the physical device has
a DRM render node.

* 
`primaryMajor` is the DRM primary node major number, if any.

* 
`primaryMinor` is the DRM primary node minor number, if any.

* 
`renderMajor` is the DRM render node major number, if any.

* 
`renderMinor` is the DRM render node minor number, if any.

If the `VkPhysicalDeviceDrmPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These are properties of the DRM information of a physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDrmPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDrmPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRM_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_physical_device_drm](VK_EXT_physical_device_drm.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceDrmPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
