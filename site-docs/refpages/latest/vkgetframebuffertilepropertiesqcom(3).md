# vkGetFramebufferTilePropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetFramebufferTilePropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetFramebufferTilePropertiesQCOM - Get tile properties from the attachments in framebuffer

To query the tile properties from the attachments in framebuffer, call:

// Provided by VK_QCOM_tile_properties
VkResult vkGetFramebufferTilePropertiesQCOM(
    VkDevice                                    device,
    VkFramebuffer                               framebuffer,
    uint32_t*                                   pPropertiesCount,
    VkTilePropertiesQCOM*                       pProperties);

* 
`device` is a logical device associated with the framebuffer.

* 
`framebuffer` is a handle of the framebuffer to query.

* 
`pPropertiesCount` is a pointer to an integer related to the number
of tile properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkTilePropertiesQCOM](VkTilePropertiesQCOM.html) structures.

If `pProperties` is `NULL`, then the number of tile properties available
is returned in `pPropertiesCount`.
Otherwise, `pPropertiesCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of properties actually
written to `pProperties`.
If `pPropertiesCount` is less than the number of tile properties
available, at most `pPropertiesCount` structures will be written, and
[VK_INCOMPLETE](VkResult.html) will be returned instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available properties were returned.

The number of tile properties available is determined by the number of
merged subpasses, and each tile property is associated with a merged
subpass.
There will be at most as many properties as there are subpasses within the
render pass.
To obtain the tile properties for a given merged subpass, the `pProperties`
array can be indexed using the `postMergeIndex` value provided in
[VkRenderPassSubpassFeedbackInfoEXT](VkRenderPassSubpassFeedbackInfoEXT.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-device-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parameter

 `framebuffer` **must** be a valid [VkFramebuffer](VkFramebuffer.html) handle

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-pPropertiesCount-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-pPropertiesCount-parameter

 `pPropertiesCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-pProperties-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-pProperties-parameter

 If the value referenced by `pPropertiesCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertiesCount` [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html) structures

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parent) VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parent

 `framebuffer` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html), [VkDevice](VkDevice.html), [VkFramebuffer](VkFramebuffer.html), [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkGetFramebufferTilePropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
