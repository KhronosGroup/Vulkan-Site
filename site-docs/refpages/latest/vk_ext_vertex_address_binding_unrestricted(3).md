# VK_EXT_vertex_address_binding_unrestricted(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_vertex_address_binding_unrestricted.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_vertex_address_binding_unrestricted](#VK_EXT_vertex_address_binding_unrestricted)
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

VK_EXT_vertex_address_binding_unrestricted - device extension

**Name String**

`VK_EXT_vertex_address_binding_unrestricted`

**Extension Type**

Device extension

**Registered Extension Number**

680

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_vertex_address_binding_unrestricted] @zmike%0A*Here describe the issue or question you have about the VK_EXT_vertex_address_binding_unrestricted extension*)

**Extension Proposal**

[VK_EXT_vertex_address_binding_unrestricted](../../../../features/latest/features/proposals/VK_EXT_vertex_address_binding_unrestricted.html)

**Last Modified Date**

2026-03-23

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html)`.

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, VALVE

When optimizing vertex attribute updates for a draw command which reads only
from the updated offset, attribute data can be split off into a separate
buffer for that draw.
For this scenario, the vertex buffer data can be bound using
`vkCmdBindVertexBuffers3KHR` such that only the effective offset read during
vertex processing is non-negative in order to reduce memory because the
calculated draw-time parameters will access valid data.
Using this extension disables address validation for this scenario.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT](VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT.html)

* 
`VK_EXT_VERTEX_ADDRESS_BINDING_UNRESTRICTED_EXTENSION_NAME`

* 
`VK_EXT_VERTEX_ADDRESS_BINDING_UNRESTRICTED_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ADDRESS_BINDING_UNRESTRICTED_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2026-03-23 (Mike Blumenkrantz)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_vertex_address_binding_unrestricted).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
