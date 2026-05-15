# VkChromaLocation(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkChromaLocation.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkChromaLocation - Position of downsampled chroma samples

The [VkChromaLocation](#) enum defines the location of downsampled chroma
component samples relative to the luma samples, and is defined as:

// Provided by VK_VERSION_1_1
typedef enum VkChromaLocation {
    VK_CHROMA_LOCATION_COSITED_EVEN = 0,
    VK_CHROMA_LOCATION_MIDPOINT = 1,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_CHROMA_LOCATION_COSITED_EVEN_KHR = VK_CHROMA_LOCATION_COSITED_EVEN,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_CHROMA_LOCATION_MIDPOINT_KHR = VK_CHROMA_LOCATION_MIDPOINT,
} VkChromaLocation;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkChromaLocation
typedef VkChromaLocation VkChromaLocationKHR;

* 
[VK_CHROMA_LOCATION_COSITED_EVEN](#) specifies that downsampled chroma
samples are aligned with luma samples with even coordinates.

* 
[VK_CHROMA_LOCATION_MIDPOINT](#) specifies that downsampled chroma
samples are located half way between each even luma sample and the
nearest higher odd luma sample.

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html), [VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html), [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html), [VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html), [VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](VkPhysicalDeviceExternalFormatResolvePropertiesANDROID.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkChromaLocation).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
