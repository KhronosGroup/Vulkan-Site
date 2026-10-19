# VK_NV_optical_flow(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_optical_flow.html

## Table of Contents

- [Name](#_name)
- [VK_NV_optical_flow](#VK_NV_optical_flow)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_optical_flow - device extension

**Name String**

`VK_NV_optical_flow`

**Extension Type**

Device extension

**Registered Extension Number**

465

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)

     and

     [VK_KHR_synchronization2](VK_KHR_synchronization2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Contact**

* 
Carsten Rohde [crohde](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_optical_flow] @crohde%0A*Here describe the issue or question you have about the VK_NV_optical_flow extension*)

**Last Modified Date**

2022-09-26

**Contributors**

* 
Carsten Rohde, NVIDIA

* 
Vipul Parashar, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Eric Werness, NVIDIA

Optical flow are fundamental algorithms in computer vision (CV) area.
This extension allows applications to estimate 2D displacement of pixels
between two frames.

|  | This extension is designed to be used with upcoming NVIDIA Optical Flow SDK
| --- | --- |
Version 5 which will be available on NVIDIA Developer webpage. |

* 
[VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html)

* 
[vkBindOpticalFlowSessionImageNV](vkBindOpticalFlowSessionImageNV.html)

* 
[vkCmdOpticalFlowExecuteNV](vkCmdOpticalFlowExecuteNV.html)

* 
[vkCreateOpticalFlowSessionNV](vkCreateOpticalFlowSessionNV.html)

* 
[vkDestroyOpticalFlowSessionNV](vkDestroyOpticalFlowSessionNV.html)

* 
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](vkGetPhysicalDeviceOpticalFlowImageFormatsNV.html)

* 
[VkOpticalFlowExecuteInfoNV](VkOpticalFlowExecuteInfoNV.html)

* 
[VkOpticalFlowImageFormatPropertiesNV](VkOpticalFlowImageFormatPropertiesNV.html)

* 
[VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html)

* 
Extending [VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html):

[VkOpticalFlowSessionCreatePrivateDataInfoNV](VkOpticalFlowSessionCreatePrivateDataInfoNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceOpticalFlowFeaturesNV](VkPhysicalDeviceOpticalFlowFeaturesNV.html)

Extending [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkOpticalFlowImageFormatInfoNV](VkOpticalFlowImageFormatInfoNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceOpticalFlowPropertiesNV](VkPhysicalDeviceOpticalFlowPropertiesNV.html)

* 
[VkOpticalFlowExecuteFlagBitsNV](VkOpticalFlowExecuteFlagBitsNV.html)

* 
[VkOpticalFlowGridSizeFlagBitsNV](VkOpticalFlowGridSizeFlagBitsNV.html)

* 
[VkOpticalFlowPerformanceLevelNV](VkOpticalFlowPerformanceLevelNV.html)

* 
[VkOpticalFlowSessionBindingPointNV](VkOpticalFlowSessionBindingPointNV.html)

* 
[VkOpticalFlowSessionCreateFlagBitsNV](VkOpticalFlowSessionCreateFlagBitsNV.html)

* 
[VkOpticalFlowUsageFlagBitsNV](VkOpticalFlowUsageFlagBitsNV.html)

* 
[VkOpticalFlowExecuteFlagsNV](VkOpticalFlowExecuteFlagsNV.html)

* 
[VkOpticalFlowGridSizeFlagsNV](VkOpticalFlowGridSizeFlagsNV.html)

* 
[VkOpticalFlowSessionCreateFlagsNV](VkOpticalFlowSessionCreateFlagsNV.html)

* 
[VkOpticalFlowUsageFlagsNV](VkOpticalFlowUsageFlagsNV.html)

* 
`VK_NV_OPTICAL_FLOW_EXTENSION_NAME`

* 
`VK_NV_OPTICAL_FLOW_SPEC_VERSION`

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_R16G16_S10_5_NV](VkFormat.html)

* 
[VK_FORMAT_R16G16_SFIXED5_NV](VkFormat.html)

Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

* 
[VK_FORMAT_FEATURE_2_OPTICAL_FLOW_COST_BIT_NV](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_OPTICAL_FLOW_IMAGE_BIT_NV](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_OPTICAL_FLOW_VECTOR_BIT_NV](VkFormatFeatureFlagBits2.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_OPTICAL_FLOW_SESSION_NV](VkObjectType.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

Extending [VkQueueFlagBits](VkQueueFlagBits.html):

* 
[VK_QUEUE_OPTICAL_FLOW_BIT_NV](VkQueueFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_OPTICAL_FLOW_EXECUTE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_PRIVATE_DATA_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_PROPERTIES_NV](VkStructureType.html)

// Example querying available input formats
VkOpticalFlowImageFormatInfoNV ofFormatInfo = { VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_INFO_NV };
ofFormatInfo.usage = VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV;

uint32_t count = 0;
vkGetPhysicalDeviceOpticalFlowImageFormatsNV(physicalDevice, &ofFormatInfo, &count, NULL);
VkOpticalFlowImageFormatPropertiesNV* fmt = new VkOpticalFlowImageFormatPropertiesNV[count];
memset(fmt, 0, count  * sizeof(VkOpticalFlowImageFormatPropertiesNV));
for (uint32_t i = 0; i 

* 
Revision 1, 2022-09-26 (Carsten Rohde)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_optical_flow).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
