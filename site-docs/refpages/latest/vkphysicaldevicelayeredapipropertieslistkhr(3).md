# VkPhysicalDeviceLayeredApiPropertiesListKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLayeredApiPropertiesListKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLayeredApiPropertiesListKHR - Structure describing layered implementations underneath the Vulkan physical device

The `VkPhysicalDeviceLayeredApiPropertiesListKHR` structure is defined
as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceLayeredApiPropertiesListKHR {
    VkStructureType                             sType;
    void*                                       pNext;
    uint32_t                                    layeredApiCount;
    VkPhysicalDeviceLayeredApiPropertiesKHR*    pLayeredApis;
} VkPhysicalDeviceLayeredApiPropertiesListKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`layeredApiCount` is an integer related to the number of layered
implementations underneath the Vulkan physical device, as described
below.

* 
`pLayeredApis` is a pointer to an array of
[VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html) in which information
regarding the layered implementations underneath the Vulkan physical
device are returned.

If `pLayeredApis` is `NULL`, then the number of layered implementations
that are underneath the top-most Vulkan physical device (i.e. the one
returned by [vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html)) is returned in
`layeredApiCount`.
Otherwise, `layeredApiCount` **must** be set by the application to the
number of elements in the `pLayeredApis` array, and on return is
overwritten with the number of values actually written to
`pLayeredApis`.
If the value of `layeredApiCount` is less than the number of layered
implementations underneath the Vulkan physical device, at most
`layeredApiCount` values will be written to `pLayeredApis`.
An implementation that is not a layer will return 0 in
`layeredApiCount`.

In the presence of multiple layered implementations, each element of
`pLayeredApis` corresponds to an API implementation that is implemented
on top of the API at the previous index.
If there are layered implementations underneath a non-Vulkan implementation,
they may not be visible in this query as the corresponding APIs may lack
such a query.

If the `VkPhysicalDeviceLayeredApiPropertiesListKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-sType-sType) VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_LIST_KHR](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-pLayeredApis-parameter) VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-pLayeredApis-parameter

 If `layeredApiCount` is not `0`, and `pLayeredApis` is not `NULL`, `pLayeredApis` **must** be a valid pointer to an array of `layeredApiCount` [VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance7](VK_KHR_maintenance7.html), [VkPhysicalDeviceLayeredApiPropertiesKHR](VkPhysicalDeviceLayeredApiPropertiesKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceLayeredApiPropertiesListKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
