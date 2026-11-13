# VK_EXT_pci_bus_info(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pci_bus_info.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pci_bus_info](#VK_EXT_pci_bus_info)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pci_bus_info - device extension

**Name String**

`VK_EXT_pci_bus_info`

**Extension Type**

Device extension

**Registered Extension Number**

213

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
Matthaeus G. Chajdas [anteru](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pci_bus_info] @anteru%0A*Here describe the issue or question you have about the VK_EXT_pci_bus_info extension*)

**Last Modified Date**

2018-12-10

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Daniel Rakos, AMD

This extension adds a new query to obtain PCI bus information about a
physical device.

Not all physical devices have PCI bus information, either due to the device
not being connected to the system through a PCI interface or due to platform
specific restrictions and policies.
Thus this extension is only expected to be supported by physical devices
which can provide the information.

As a consequence, applications should always check for the presence of the
extension string for each individual physical device for which they intend
to issue the new query for and should not have any assumptions about the
availability of the extension on any given platform.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDevicePCIBusInfoPropertiesEXT](VkPhysicalDevicePCIBusInfoPropertiesEXT.html)

* 
`VK_EXT_PCI_BUS_INFO_EXTENSION_NAME`

* 
`VK_EXT_PCI_BUS_INFO_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PCI_BUS_INFO_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 2, 2018-12-10 (Daniel Rakos)

Changed all members of the new structure to have the uint32_t type

Revision 1, 2018-10-11 (Daniel Rakos)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pci_bus_info).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
