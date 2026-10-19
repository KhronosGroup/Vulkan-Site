# VkPhysicalDeviceDriverProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDriverProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDriverProperties - Structure containing driver identification information

The `VkPhysicalDeviceDriverProperties` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDriverProperties {
    VkStructureType         sType;
    void*                   pNext;
    VkDriverId              driverID;
    char                    driverName[VK_MAX_DRIVER_NAME_SIZE];
    char                    driverInfo[VK_MAX_DRIVER_INFO_SIZE];
    VkConformanceVersion    conformanceVersion;
} VkPhysicalDeviceDriverProperties;

// Provided by VK_KHR_driver_properties
// Equivalent to VkPhysicalDeviceDriverProperties
typedef VkPhysicalDeviceDriverProperties VkPhysicalDeviceDriverPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`driverID` is a unique identifier for the driver of the physical
device.

* 
`driverName` is an array of [VK_MAX_DRIVER_NAME_SIZE](VK_MAX_DRIVER_NAME_SIZE.html) `char`
containing a null-terminated UTF-8 string which is the name of the
driver.

* 
`driverInfo` is an array of [VK_MAX_DRIVER_INFO_SIZE](VK_MAX_DRIVER_INFO_SIZE.html) `char`
containing a null-terminated UTF-8 string with additional information
about the driver.

* 
`conformanceVersion` is the latest version of the Vulkan conformance
test that the implementor has successfully tested this driver against
prior to release (see [VkConformanceVersion](VkConformanceVersion.html)).

If the `VkPhysicalDeviceDriverProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These are properties of the driver corresponding to a physical device.

`driverID` **must** be immutable for a given driver across instances,
processes, driver versions, and system reboots.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDriverProperties-sType-sType) VUID-VkPhysicalDeviceDriverProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_driver_properties](VK_KHR_driver_properties.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkConformanceVersion](VkConformanceVersion.html), [VkDriverId](VkDriverId.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceDriverProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
