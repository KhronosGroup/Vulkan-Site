# VkSampleCountFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSampleCountFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSampleCountFlagBits - Bitmask specifying sample counts supported for an image used for storage operations

Bits which **may** be set in the sample count limits returned by
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html), as well as in other queries and structures
representing image sample counts, are:

// Provided by VK_VERSION_1_0
typedef enum VkSampleCountFlagBits {
    VK_SAMPLE_COUNT_1_BIT = 0x00000001,
    VK_SAMPLE_COUNT_2_BIT = 0x00000002,
    VK_SAMPLE_COUNT_4_BIT = 0x00000004,
    VK_SAMPLE_COUNT_8_BIT = 0x00000008,
    VK_SAMPLE_COUNT_16_BIT = 0x00000010,
    VK_SAMPLE_COUNT_32_BIT = 0x00000020,
    VK_SAMPLE_COUNT_64_BIT = 0x00000040,
} VkSampleCountFlagBits;

* 
[VK_SAMPLE_COUNT_1_BIT](#) specifies an image with one sample per
pixel.

* 
[VK_SAMPLE_COUNT_2_BIT](#) specifies an image with 2 samples per pixel.

* 
[VK_SAMPLE_COUNT_4_BIT](#) specifies an image with 4 samples per pixel.

* 
[VK_SAMPLE_COUNT_8_BIT](#) specifies an image with 8 samples per pixel.

* 
[VK_SAMPLE_COUNT_16_BIT](#) specifies an image with 16 samples per
pixel.

* 
[VK_SAMPLE_COUNT_32_BIT](#) specifies an image with 32 samples per
pixel.

* 
[VK_SAMPLE_COUNT_64_BIT](#) specifies an image with 64 samples per
pixel.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAttachmentDescription](VkAttachmentDescription.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html), [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html), [VkFramebufferMixedSamplesCombinationNV](VkFramebufferMixedSamplesCombinationNV.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html), [VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV](VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV.html), [VkPhysicalDeviceFragmentShadingRatePropertiesKHR](VkPhysicalDeviceFragmentShadingRatePropertiesKHR.html), [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html), [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html), [VkSampleCountFlags](VkSampleCountFlags.html), [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html), [vkCmdSetRasterizationSamplesEXT](vkCmdSetRasterizationSamplesEXT.html), [vkCmdSetSampleMaskEXT](vkCmdSetSampleMaskEXT.html), [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html), [vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkSampleCountFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
