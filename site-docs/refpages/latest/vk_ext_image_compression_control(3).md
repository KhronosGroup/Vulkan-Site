# VK_EXT_image_compression_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_compression_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_compression_control](#VK_EXT_image_compression_control)
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

VK_EXT_image_compression_control - device extension

**Name String**

`VK_EXT_image_compression_control`

**Extension Type**

Device extension

**Registered Extension Number**

339

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jan-Harald Fredriksen [janharaldfredriksen-arm](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_compression_control] @janharaldfredriksen-arm%0A*Here describe the issue or question you have about the VK_EXT_image_compression_control extension*)

**Extension Proposal**

[VK_EXT_image_compression_control](../../../../features/latest/features/proposals/VK_EXT_image_compression_control.html)

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

This extension enables fixed-rate image compression and adds the ability to
control when this kind of compression can be applied.
Many implementations support some form of framebuffer compression.
This is typically transparent to applications as lossless compression
schemes are used.
With fixed-rate compression, the compression is done at a defined bitrate.
Such compression algorithms generally produce results that are visually
lossless, but the results are typically not bit-exact when compared to a
non-compressed result.
The implementation may not be able to use the requested compression rate in
all cases.
This extension adds a query that can be used to determine the compression
scheme and rate that was applied to an image.

* 
[vkGetImageSubresourceLayout2EXT](vkGetImageSubresourceLayout2.html)

* 
[VkImageSubresource2EXT](VkImageSubresource2.html)

* 
[VkSubresourceLayout2EXT](VkSubresourceLayout2.html)

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

[VkImageCompressionControlEXT](VkImageCompressionControlEXT.html)

Extending [VkImageFormatProperties2](VkImageFormatProperties2.html), [VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html), [VkSubresourceLayout2](VkSubresourceLayout2.html):

* 
[VkImageCompressionPropertiesEXT](VkImageCompressionPropertiesEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceImageCompressionControlFeaturesEXT](VkPhysicalDeviceImageCompressionControlFeaturesEXT.html)

* 
[VkImageCompressionFixedRateFlagBitsEXT](VkImageCompressionFixedRateFlagBitsEXT.html)

* 
[VkImageCompressionFlagBitsEXT](VkImageCompressionFlagBitsEXT.html)

* 
[VkImageCompressionFixedRateFlagsEXT](VkImageCompressionFixedRateFlagsEXT.html)

* 
[VkImageCompressionFlagsEXT](VkImageCompressionFlagsEXT.html)

* 
`VK_EXT_IMAGE_COMPRESSION_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_COMPRESSION_CONTROL_SPEC_VERSION`

* 
Extending [VkResult](VkResult.html):

[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_CONTROL_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_COMPRESSION_CONTROL_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2_EXT](VkStructureType.html)

* 
Revision 1, 2022-05-02 (Jan-Harald Fredriksen)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_compression_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
