# VK_EXT_device_fault(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_device_fault.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_device_fault](#VK_EXT_device_fault)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_device_fault - device extension

**Name String**

`VK_EXT_device_fault`

**Extension Type**

Device extension

**Registered Extension Number**

342

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Ralph Potter r_potter

**Extension Proposal**

[VK_EXT_device_fault](../../../../features/latest/features/proposals/VK_EXT_device_fault.html)

**Last Modified Date**

2021-03-10

**IP Status**

No known IP claims.

**Contributors**

* 
Ralph Potter, Samsung

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

Device loss can be triggered by a variety of issues, including invalid API
usage, implementation errors, or hardware failures.

This extension introduces a new command: [vkGetDeviceFaultInfoEXT](vkGetDeviceFaultInfoEXT.html),
which may be called subsequent to a [VK_ERROR_DEVICE_LOST](VkResult.html) error code
having been returned by the implementation.
This command allows developers to query for additional information on GPU
faults which may have caused device loss, and to generate binary crash
dumps, which may be loaded into external tools for further diagnosis.

* 
[vkGetDeviceFaultInfoEXT](vkGetDeviceFaultInfoEXT.html)

* 
[VkDeviceFaultAddressInfoEXT](VkDeviceFaultAddressInfoEXT.html)

* 
[VkDeviceFaultCountsEXT](VkDeviceFaultCountsEXT.html)

* 
[VkDeviceFaultInfoEXT](VkDeviceFaultInfoEXT.html)

* 
[VkDeviceFaultVendorBinaryHeaderVersionOneEXT](VkDeviceFaultVendorBinaryHeaderVersionOneEXT.html)

* 
[VkDeviceFaultVendorInfoEXT](VkDeviceFaultVendorInfoEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceFaultFeaturesEXT](VkPhysicalDeviceFaultFeaturesEXT.html)

* 
[VkDeviceFaultAddressTypeEXT](VkDeviceFaultAddressTypeEXT.html)

* 
[VkDeviceFaultVendorBinaryHeaderVersionEXT](VkDeviceFaultVendorBinaryHeaderVersionEXT.html)

* 
`VK_EXT_DEVICE_FAULT_EXTENSION_NAME`

* 
`VK_EXT_DEVICE_FAULT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEVICE_FAULT_COUNTS_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_EXT](VkStructureType.html)

* 
Revision 2, 2023-04-05 (Ralph Potter)

Restored two missing members to the XML definition of
VkDeviceFaultVendorBinaryHeaderVersionOneEXT.
No functional change to the specification.

Revision 1, 2020-10-19 (Ralph Potter)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_device_fault).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
