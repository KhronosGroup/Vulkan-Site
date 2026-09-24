# VkExtent2D(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExtent2D.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExtent2D - Structure specifying a two-dimensional extent

A two-dimensional extent is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkExtent2D {
    uint32_t    width;
    uint32_t    height;
} VkExtent2D;

* 
`width` is the width of the extent.

* 
`height` is the height of the extent.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDisplayModeParametersKHR](VkDisplayModeParametersKHR.html), [VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html), [VkDisplayPropertiesKHR](VkDisplayPropertiesKHR.html), [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html), [VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html), [VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html), [VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html), [VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT](VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT.html), [VkPhysicalDeviceFragmentDensityMapPropertiesEXT](VkPhysicalDeviceFragmentDensityMapPropertiesEXT.html), [VkPhysicalDeviceFragmentShadingRateKHR](VkPhysicalDeviceFragmentShadingRateKHR.html), [VkPhysicalDeviceFragmentShadingRatePropertiesKHR](VkPhysicalDeviceFragmentShadingRatePropertiesKHR.html), [VkPhysicalDeviceImageProcessing2PropertiesQCOM](VkPhysicalDeviceImageProcessing2PropertiesQCOM.html), [VkPhysicalDeviceImageProcessingPropertiesQCOM](VkPhysicalDeviceImageProcessingPropertiesQCOM.html), [VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](VkPhysicalDevicePerformanceCountersByRegionPropertiesARM.html), [VkPhysicalDeviceRenderPassStripedPropertiesARM](VkPhysicalDeviceRenderPassStripedPropertiesARM.html), [VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html), [VkPhysicalDeviceShadingRateImagePropertiesNV](VkPhysicalDeviceShadingRateImagePropertiesNV.html), [VkPhysicalDeviceTileShadingPropertiesQCOM](VkPhysicalDeviceTileShadingPropertiesQCOM.html), [VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html), [VkRect2D](VkRect2D.html), [VkRectLayerKHR](VkRectLayerKHR.html), [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html), [VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html), [VkSampleLocationsInfoEXT](VkSampleLocationsInfoEXT.html), [VkSamplerBlockMatchWindowCreateInfoQCOM](VkSamplerBlockMatchWindowCreateInfoQCOM.html), [VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html), [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html), [VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html), [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html), [VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html), [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html), [VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html), [VkVideoEncodeQuantizationMapCapabilitiesKHR](VkVideoEncodeQuantizationMapCapabilitiesKHR.html), [VkVideoEncodeQuantizationMapInfoKHR](VkVideoEncodeQuantizationMapInfoKHR.html), [VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR](VkVideoEncodeQuantizationMapSessionParametersCreateInfoKHR.html), [VkVideoFormatQuantizationMapPropertiesKHR](VkVideoFormatQuantizationMapPropertiesKHR.html), [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html), [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html), [vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html), [vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI](vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI.html), [vkGetRenderAreaGranularity](vkGetRenderAreaGranularity.html), [vkGetRenderingAreaGranularity](vkGetRenderingAreaGranularity.html), [vkGetRenderingAreaGranularity](vkGetRenderingAreaGranularity.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkExtent2D).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
