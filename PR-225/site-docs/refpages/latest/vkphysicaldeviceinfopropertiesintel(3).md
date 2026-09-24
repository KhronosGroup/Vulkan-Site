# VkPhysicalDeviceInfoPropertiesINTEL(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceInfoPropertiesINTEL.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceInfoPropertiesINTEL - Structure containing the IP version of a physical device

The `VkPhysicalDeviceInfoPropertiesINTEL` structure is defined as:

// Provided by VK_INTEL_device_info
typedef struct VkPhysicalDeviceInfoPropertiesINTEL {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           deviceIpVersionArch;
    uint32_t           deviceIpVersionRelease;
    uint32_t           deviceIpVersionRevision;
} VkPhysicalDeviceInfoPropertiesINTEL;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIpVersionArch` is the major architecture generation of the
intellectual property (IP) block implemented by the physical device.

* 
`deviceIpVersionRelease` is the release of that architecture
generation implemented by the physical device.

* 
`deviceIpVersionRevision` is the revision, or stepping, of that
release implemented by the physical device.

Together these three values identify the graphics IP of the physical device,
ordered from most to least significant.
`deviceIpVersionRelease` is only meaningful relative to a given
`deviceIpVersionArch`, and `deviceIpVersionRevision` is only
meaningful relative to a given `deviceIpVersionRelease`.

A physical device implementing a later graphics IP **must** report values that
compare greater, in that order of significance, than the values reported by
a physical device implementing an earlier graphics IP.
Applications **can** rely on this ordering to determine whether a physical
device implements at least a given graphics IP.

If the physical device does not report an IP version, all three values will
be zero.

If the `VkPhysicalDeviceInfoPropertiesINTEL` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These are properties of the IP version of a physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInfoPropertiesINTEL-sType-sType) VUID-VkPhysicalDeviceInfoPropertiesINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INFO_PROPERTIES_INTEL](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_INTEL_device_info](VK_INTEL_device_info.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceInfoPropertiesINTEL).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
