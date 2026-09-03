# VK_NV_private_data_base_handle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_private_data_base_handle.html

## Table of Contents

- [Name](#_name)
- [VK_NV_private_data_base_handle](#VK_NV_private_data_base_handle)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_private_data_base_handle - device extension

**Name String**

`VK_NV_private_data_base_handle`

**Extension Type**

Device extension

**Registered Extension Number**

708

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

or

[VK_EXT_private_data](VK_EXT_private_data.html)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_private_data_base_handle] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_NV_private_data_base_handle extension*)

**Extension Proposal**

[VK_NV_private_data_base_handle](../../../../features/latest/features/proposals/VK_NV_private_data_base_handle.html)

**Last Modified Date**

2026-08-14

**IP Status**

No known IP claims.

**Contributors**

* 
Kedarnath Thangudu, NVIDIA

Layers commonly wrap Vulkan device-level object handles.
When a tool or application needs the driver’s underlying handle (for
example, to communicate directly with the driver outside the layer chain),
it has no standard way to recover it from a wrapped handle.

This extension exposes a mechanism that NVIDIA already ships internally:
creating a [VkPrivateDataSlot](VkPrivateDataSlot.html) with
[VK_PRIVATE_DATA_SLOT_CREATE_BASE_OBJECT_HANDLE_BIT_NV](VkPrivateDataSlotCreateFlagBits.html) and then calling
`vkGetPrivateData` with that slot causes the implementation to return
its own base handle for the object rather than any previously set private
data.

Because `vkGetPrivateData` is already forwarded through the layer
dispatch chain with each layer substituting the real handle for its wrapper,
no new dispatch entry points are required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePrivateDataBaseHandleFeaturesNV](VkPhysicalDevicePrivateDataBaseHandleFeaturesNV.html)

* 
`VK_NV_PRIVATE_DATA_BASE_HANDLE_EXTENSION_NAME`

* 
`VK_NV_PRIVATE_DATA_BASE_HANDLE_SPEC_VERSION`

* 
Extending [VkPrivateDataSlotCreateFlagBits](VkPrivateDataSlotCreateFlagBits.html):

[VK_PRIVATE_DATA_SLOT_CREATE_BASE_OBJECT_HANDLE_BIT_NV](VkPrivateDataSlotCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_BASE_HANDLE_FEATURES_NV](VkStructureType.html)

None.

* 
Revision 1, 2026-08-14 (Piers Daniell)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_private_data_base_handle).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
