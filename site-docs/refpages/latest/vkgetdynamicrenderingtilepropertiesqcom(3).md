# vkGetDynamicRenderingTilePropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDynamicRenderingTilePropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDynamicRenderingTilePropertiesQCOM - Get the properties when using dynamic rendering

To query the tile properties when using dynamic rendering, call:

// Provided by VK_QCOM_tile_properties
VkResult vkGetDynamicRenderingTilePropertiesQCOM(
    VkDevice                                    device,
    const VkRenderingInfo*                      pRenderingInfo,
    VkTilePropertiesQCOM*                       pProperties);

* 
`device` is a logical device associated with the render pass.

* 
`pRenderingInfo` is a pointer to the [VkRenderingInfo](VkRenderingInfo.html) structure
specifying details of the render pass instance in dynamic rendering.

* 
`pProperties` is a pointer to a [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html) structure
in which the properties are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDynamicRenderingTilePropertiesQCOM-device-parameter) VUID-vkGetDynamicRenderingTilePropertiesQCOM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDynamicRenderingTilePropertiesQCOM-pRenderingInfo-parameter) VUID-vkGetDynamicRenderingTilePropertiesQCOM-pRenderingInfo-parameter

 `pRenderingInfo` **must** be a valid pointer to a valid [VkRenderingInfo](VkRenderingInfo.html) structure

* 
[](#VUID-vkGetDynamicRenderingTilePropertiesQCOM-pProperties-parameter) VUID-vkGetDynamicRenderingTilePropertiesQCOM-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html), [VkDevice](VkDevice.html), [VkRenderingInfo](VkRenderingInfo.html), [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkGetDynamicRenderingTilePropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
