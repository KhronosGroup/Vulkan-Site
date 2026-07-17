# VK_EXT_image_compression_control_swapchain(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_compression_control_swapchain.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_compression_control_swapchain](#VK_EXT_image_compression_control_swapchain)
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

VK_EXT_image_compression_control_swapchain - device extension

**Name String**

`VK_EXT_image_compression_control_swapchain`

**Extension Type**

Device extension

**Registered Extension Number**

438

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_image_compression_control](VK_EXT_image_compression_control.html)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_compression_control_swapchain] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_image_compression_control_swapchain extension*)

**Last Modified Date**

2022-05-02

**IP Status**

No known IP claims.

**Contributors**

* 
Jan-Harald Fredriksen, Arm

* 
Graeme Leese, Broadcom

* 
Andrew Garrard, Imagination

* 
Lisa Wu, Arm

* 
Peter Kohaut, Arm

* 
Ian Elliott, Google

This extension enables fixed-rate image compression and adds the ability to
control when this kind of compression can be applied to swapchain images.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT](VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT.html)

* 
`VK_EXT_IMAGE_COMPRESSION_CONTROL_SWAPCHAIN_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_COMPRESSION_CONTROL_SWAPCHAIN_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_COMPRESSION_CONTROL_SWAPCHAIN_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2022-05-02 (Jan-Harald Fredriksen)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_compression_control_swapchain).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
