# VK_VALVE_video_encode_rgb_conversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VALVE_video_encode_rgb_conversion.html

## Table of Contents

- [Name](#_name)
- [VK_VALVE_video_encode_rgb_conversion](#VK_VALVE_video_encode_rgb_conversion)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VALVE_video_encode_rgb_conversion - device extension

**Name String**

`VK_VALVE_video_encode_rgb_conversion`

**Extension Type**

Device extension

**Registered Extension Number**

391

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)

and

     [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Autumn Ashton [misyltoad](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_video_encode_rgb_conversion] @misyltoad%0A*Here describe the issue or question you have about the VK_VALVE_video_encode_rgb_conversion extension*)

**Last Modified Date**

2025-08-22

**IP Status**

No known IP claims.

**Contributors**

* 
Autumn Ashton, Valve

* 
Daniel Rakos, RasterGrid

This extension builds upon the `[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html)` extension
by enabling the application to pass in RGB/RGBA images in video encode
operations.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE](VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE.html)

Extending [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html):

* 
[VkVideoEncodeRgbConversionCapabilitiesVALVE](VkVideoEncodeRgbConversionCapabilitiesVALVE.html)

Extending [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html):

* 
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html)

Extending [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html):

* 
[VkVideoEncodeSessionRgbConversionCreateInfoVALVE](VkVideoEncodeSessionRgbConversionCreateInfoVALVE.html)

* 
[VkVideoEncodeRgbChromaOffsetFlagBitsVALVE](VkVideoEncodeRgbChromaOffsetFlagBitsVALVE.html)

* 
[VkVideoEncodeRgbModelConversionFlagBitsVALVE](VkVideoEncodeRgbModelConversionFlagBitsVALVE.html)

* 
[VkVideoEncodeRgbRangeCompressionFlagBitsVALVE](VkVideoEncodeRgbRangeCompressionFlagBitsVALVE.html)

* 
[VkVideoEncodeRgbChromaOffsetFlagsVALVE](VkVideoEncodeRgbChromaOffsetFlagsVALVE.html)

* 
[VkVideoEncodeRgbModelConversionFlagsVALVE](VkVideoEncodeRgbModelConversionFlagsVALVE.html)

* 
[VkVideoEncodeRgbRangeCompressionFlagsVALVE](VkVideoEncodeRgbRangeCompressionFlagsVALVE.html)

* 
`VK_VALVE_VIDEO_ENCODE_RGB_CONVERSION_EXTENSION_NAME`

* 
`VK_VALVE_VIDEO_ENCODE_RGB_CONVERSION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_RGB_CONVERSION_FEATURES_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_PROFILE_RGB_CONVERSION_INFO_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_RGB_CONVERSION_CAPABILITIES_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_RGB_CONVERSION_CREATE_INFO_VALVE](VkStructureType.html)

* 
Revision 1, 2025-08-22 (Autumn Ashton)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_VALVE_video_encode_rgb_conversion).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
