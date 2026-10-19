# VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX - Structure describing multiview limits that can be supported by an implementation

The `VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX` structure
is defined as:

// Provided by VK_NVX_multiview_per_view_attributes
typedef struct VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           perViewPositionAllComponents;
} VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`perViewPositionAllComponents` is [VK_TRUE](VK_TRUE.html) if the
implementation supports per-view position values that differ in
components other than the X component.

If the `VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX-sType-sType) VUID-VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_ATTRIBUTES_PROPERTIES_NVX](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NVX_multiview_per_view_attributes](VK_NVX_multiview_per_view_attributes.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
