# VK_KHR_device_fault(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_device_fault.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_device_fault](#VK_KHR_device_fault)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_device_fault - device extension

**Name String**

`VK_KHR_device_fault`

**Extension Type**

Device extension

**Registered Extension Number**

574

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

**Contact**

* 
Ralph Potter r_potter

**Extension Proposal**

[VK_KHR_device_fault](../../../../features/latest/features/proposals/VK_KHR_device_fault.html)

**Last Modified Date**

2026-03-18

**IP Status**

No known IP claims.

**Contributors**

* 
Ralph Potter, Samsung

* 
Craig Graham, Samsung

* 
Stuart Smith, AMD

* 
Jan-Harald Fredriksen, ARM

* 
Mark Bellamy, ARM

* 
Andrew Ellem, Google

* 
Alex Walters, IMG

* 
Jeff Bolz, NVIDIA

* 
Baldur Karlsson, Valve

* 
Adrian Ravai, Samsung

* 
Peter Gal, Samsung

* 
Matthew Netsch, QUALCOMM

* 
Tobias Hector, AMD

* 
Alan Harrison, AMD

* 
Vikram Tarikere, IMG

* 
Jon Leech, Khronos

* 
Samuel Pitoiset, Valve

Device loss can be triggered by a variety of issues, including invalid API
usage, implementation errors, or hardware failures.
This extension introduces two new commands:

* 
[vkGetDeviceFaultReportsKHR](vkGetDeviceFaultReportsKHR.html)

* 
[vkGetDeviceFaultDebugInfoKHR](vkGetDeviceFaultDebugInfoKHR.html)

[vkGetDeviceFaultReportsKHR](vkGetDeviceFaultReportsKHR.html) allows developers to query for additional
information on GPU faults which may have caused device loss, and to generate
binary crash dumps, which may be loaded into external tools for further
diagnosis.
Additionally this command allows developers to query for additional
information on GPU faults which were internally recovered by the
implementation.

[vkGetDeviceFaultReportsKHR](vkGetDeviceFaultReportsKHR.html) differs from [vkGetDeviceFaultInfoEXT](vkGetDeviceFaultInfoEXT.html)
in that it can be called at any time, is able to report faults which do not
result in [VK_ERROR_DEVICE_LOST](VkResult.html) and allows the caller to wait for such
an error to occur.

[vkGetDeviceFaultDebugInfoKHR](vkGetDeviceFaultDebugInfoKHR.html) provides a separate interface which **must**
only be called when a device loss has occurred to provide extended GPU
vendor specific crash post-mortem information.

* 
[vkGetDeviceFaultDebugInfoKHR](vkGetDeviceFaultDebugInfoKHR.html)

* 
[vkGetDeviceFaultReportsKHR](vkGetDeviceFaultReportsKHR.html)

* 
[VkDeviceFaultAddressInfoKHR](VkDeviceFaultAddressInfoKHR.html)

* 
[VkDeviceFaultDebugInfoKHR](VkDeviceFaultDebugInfoKHR.html)

* 
[VkDeviceFaultInfoKHR](VkDeviceFaultInfoKHR.html)

* 
[VkDeviceFaultVendorBinaryHeaderVersionOneKHR](VkDeviceFaultVendorBinaryHeaderVersionOneKHR.html)

* 
[VkDeviceFaultVendorInfoKHR](VkDeviceFaultVendorInfoKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFaultFeaturesKHR](VkPhysicalDeviceFaultFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceFaultPropertiesKHR](VkPhysicalDeviceFaultPropertiesKHR.html)

* 
[VkDeviceFaultAddressTypeKHR](VkDeviceFaultAddressTypeKHR.html)

* 
[VkDeviceFaultFlagBitsKHR](VkDeviceFaultFlagBitsKHR.html)

* 
[VkDeviceFaultVendorBinaryHeaderVersionKHR](VkDeviceFaultVendorBinaryHeaderVersionKHR.html)

* 
[VkDeviceFaultFlagsKHR](VkDeviceFaultFlagsKHR.html)

* 
`VK_KHR_DEVICE_FAULT_EXTENSION_NAME`

* 
`VK_KHR_DEVICE_FAULT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_FAULT_DEBUG_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_PROPERTIES_KHR](VkStructureType.html)

* 
Revision 0, 2024-03-01 (Ralph Potter)

Internal Revision

Revision 1, 2025-06-10 (Craig Graham)

* 
Revised API to support async fault queries.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_device_fault).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
