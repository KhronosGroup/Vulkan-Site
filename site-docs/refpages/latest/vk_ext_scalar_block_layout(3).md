# VK_EXT_scalar_block_layout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_scalar_block_layout.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_scalar_block_layout](#VK_EXT_scalar_block_layout)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_scalar_block_layout - device extension

**Name String**

`VK_EXT_scalar_block_layout`

**Extension Type**

Device extension

**Registered Extension Number**

222

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_scalar_block_layout] @tobski%0A*Here describe the issue or question you have about the VK_EXT_scalar_block_layout extension*)

**Last Modified Date**

2018-11-14

**Contributors**

* 
Jeff Bolz

* 
Jan-Harald Fredriksen

* 
Graeme Leese

* 
Faith Ekstrand

* 
John Kessenich

This extension enables C-like structure layout for SPIR-V blocks.
It modifies the alignment rules for uniform buffers, storage buffers and
push constants, allowing non-scalar types to be aligned solely based on the
size of their components, without additional requirements.

Vulkan APIs in this extension are included in core Vulkan 1.2, with the EXT
suffix omitted.
However, if Vulkan 1.2 is supported and this extension is not, the
`scalarBlockLayout` capability is optional.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

If Vulkan 1.4 is supported, support for the `scalarBlockLayout`
capability is required.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceScalarBlockLayoutFeaturesEXT](VkPhysicalDeviceScalarBlockLayoutFeatures.html)

* 
`VK_EXT_SCALAR_BLOCK_LAYOUT_EXTENSION_NAME`

* 
`VK_EXT_SCALAR_BLOCK_LAYOUT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2018-11-14 (Tobias Hector)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_scalar_block_layout).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
