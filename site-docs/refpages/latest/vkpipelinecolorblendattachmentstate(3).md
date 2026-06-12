# VkPipelineColorBlendAttachmentState(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineColorBlendAttachmentState.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineColorBlendAttachmentState - Structure specifying a pipeline color blend attachment state

The `VkPipelineColorBlendAttachmentState` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineColorBlendAttachmentState {
    VkBool32                 blendEnable;
    VkBlendFactor            srcColorBlendFactor;
    VkBlendFactor            dstColorBlendFactor;
    VkBlendOp                colorBlendOp;
    VkBlendFactor            srcAlphaBlendFactor;
    VkBlendFactor            dstAlphaBlendFactor;
    VkBlendOp                alphaBlendOp;
    VkColorComponentFlags    colorWriteMask;
} VkPipelineColorBlendAttachmentState;

* 
`blendEnable` controls whether blending is enabled for the
corresponding color attachment.
If blending is not enabled, the source fragment’s color for that
attachment is passed through unmodified.

* 
`srcColorBlendFactor` selects which blend factor is used to
determine the source factors (Sr,Sg,Sb).

* 
`dstColorBlendFactor` selects which blend factor is used to
determine the destination factors (Dr,Dg,Db).

* 
`colorBlendOp` selects which blend operation is used to calculate
the RGB values to write to the color attachment.

* 
`srcAlphaBlendFactor` selects which blend factor is used to
determine the source factor Sa.

* 
`dstAlphaBlendFactor` selects which blend factor is used to
determine the destination factor Da.

* 
`alphaBlendOp` selects which blend operation is used to calculate
the alpha values to write to the color attachment.

* 
`colorWriteMask` is a bitmask of [VkColorComponentFlagBits](VkColorComponentFlagBits.html)
specifying which of the R, G, B, and/or A components are enabled for
writing, as described for the [Color Write    Mask](../../../../spec/latest/chapters/framebuffer.html#framebuffer-color-write-mask).

Valid Usage

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-00608) VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-00608

If the [`dualSrcBlend`](../../../../spec/latest/chapters/features.html#features-dualSrcBlend) feature is not
enabled, `srcColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_SRC1_ALPHA](VkBlendFactor.html), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](VkBlendFactor.html)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-00609) VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-00609

If the [`dualSrcBlend`](../../../../spec/latest/chapters/features.html#features-dualSrcBlend) feature is not
enabled, `dstColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_SRC1_ALPHA](VkBlendFactor.html), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](VkBlendFactor.html)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-00610) VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-00610

If the [`dualSrcBlend`](../../../../spec/latest/chapters/features.html#features-dualSrcBlend) feature is not
enabled, `srcAlphaBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_SRC1_ALPHA](VkBlendFactor.html), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](VkBlendFactor.html)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-00611) VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-00611

If the [`dualSrcBlend`](../../../../spec/latest/chapters/features.html#features-dualSrcBlend) feature is not
enabled, `dstAlphaBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_SRC1_ALPHA](VkBlendFactor.html), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](VkBlendFactor.html)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01406) VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01406

If either of `colorBlendOp` or `alphaBlendOp` is an
[advanced blend operation](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced), then
`colorBlendOp` **must** equal `alphaBlendOp`

* 
[](#VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01407) VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01407

If
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html)::`advancedBlendIndependentBlend`
is [VK_FALSE](VK_FALSE.html) and `colorBlendOp` is an
[advanced blend operation](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced), then
`colorBlendOp` **must** be the same for all attachments

* 
[](#VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01408) VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01408

If
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html)::`advancedBlendIndependentBlend`
is [VK_FALSE](VK_FALSE.html) and `alphaBlendOp` is an
[advanced blend operation](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced), then
`alphaBlendOp` **must** be the same for all attachments

* 
[](#VUID-VkPipelineColorBlendAttachmentState-advancedBlendAllOperations-01409) VUID-VkPipelineColorBlendAttachmentState-advancedBlendAllOperations-01409

If
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html)::`advancedBlendAllOperations`
is [VK_FALSE](VK_FALSE.html), then `colorBlendOp` **must** not be
[VK_BLEND_OP_ZERO_EXT](VkBlendOp.html), [VK_BLEND_OP_SRC_EXT](VkBlendOp.html),
[VK_BLEND_OP_DST_EXT](VkBlendOp.html), [VK_BLEND_OP_SRC_OVER_EXT](VkBlendOp.html),
[VK_BLEND_OP_DST_OVER_EXT](VkBlendOp.html), [VK_BLEND_OP_SRC_IN_EXT](VkBlendOp.html),
[VK_BLEND_OP_DST_IN_EXT](VkBlendOp.html), [VK_BLEND_OP_SRC_OUT_EXT](VkBlendOp.html),
[VK_BLEND_OP_DST_OUT_EXT](VkBlendOp.html), [VK_BLEND_OP_SRC_ATOP_EXT](VkBlendOp.html),
[VK_BLEND_OP_DST_ATOP_EXT](VkBlendOp.html), [VK_BLEND_OP_XOR_EXT](VkBlendOp.html),
[VK_BLEND_OP_INVERT_EXT](VkBlendOp.html), [VK_BLEND_OP_INVERT_RGB_EXT](VkBlendOp.html),
[VK_BLEND_OP_LINEARDODGE_EXT](VkBlendOp.html), [VK_BLEND_OP_LINEARBURN_EXT](VkBlendOp.html),
[VK_BLEND_OP_VIVIDLIGHT_EXT](VkBlendOp.html), [VK_BLEND_OP_LINEARLIGHT_EXT](VkBlendOp.html),
[VK_BLEND_OP_PINLIGHT_EXT](VkBlendOp.html), [VK_BLEND_OP_HARDMIX_EXT](VkBlendOp.html),
[VK_BLEND_OP_PLUS_EXT](VkBlendOp.html), [VK_BLEND_OP_PLUS_CLAMPED_EXT](VkBlendOp.html),
[VK_BLEND_OP_PLUS_CLAMPED_ALPHA_EXT](VkBlendOp.html),
[VK_BLEND_OP_PLUS_DARKER_EXT](VkBlendOp.html), [VK_BLEND_OP_MINUS_EXT](VkBlendOp.html),
[VK_BLEND_OP_MINUS_CLAMPED_EXT](VkBlendOp.html), [VK_BLEND_OP_CONTRAST_EXT](VkBlendOp.html),
[VK_BLEND_OP_INVERT_OVG_EXT](VkBlendOp.html), [VK_BLEND_OP_RED_EXT](VkBlendOp.html),
[VK_BLEND_OP_GREEN_EXT](VkBlendOp.html), or [VK_BLEND_OP_BLUE_EXT](VkBlendOp.html)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01410) VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01410

If `colorBlendOp` or `alphaBlendOp` is an
[advanced blend operation](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blend-advanced), then
`colorAttachmentCount` of the subpass this pipeline is compiled
against **must** be less than or equal to
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT.html)::`advancedBlendMaxColorAttachments`

* 
[](#VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04454) VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04454

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`constantAlphaColorBlendFactors`
is [VK_FALSE](VK_FALSE.html), `srcColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_CONSTANT_ALPHA](VkBlendFactor.html) or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](VkBlendFactor.html)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04455) VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04455

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`constantAlphaColorBlendFactors`
is [VK_FALSE](VK_FALSE.html), `dstColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_CONSTANT_ALPHA](VkBlendFactor.html) or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](VkBlendFactor.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-parameter

 `srcColorBlendFactor` **must** be a valid [VkBlendFactor](VkBlendFactor.html) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-parameter

 `dstColorBlendFactor` **must** be a valid [VkBlendFactor](VkBlendFactor.html) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-parameter) VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-parameter

 `colorBlendOp` **must** be a valid [VkBlendOp](VkBlendOp.html) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-parameter

 `srcAlphaBlendFactor` **must** be a valid [VkBlendFactor](VkBlendFactor.html) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-parameter

 `dstAlphaBlendFactor` **must** be a valid [VkBlendFactor](VkBlendFactor.html) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-alphaBlendOp-parameter) VUID-VkPipelineColorBlendAttachmentState-alphaBlendOp-parameter

 `alphaBlendOp` **must** be a valid [VkBlendOp](VkBlendOp.html) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorWriteMask-parameter) VUID-VkPipelineColorBlendAttachmentState-colorWriteMask-parameter

 `colorWriteMask` **must** be a valid combination of [VkColorComponentFlagBits](VkColorComponentFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBlendFactor](VkBlendFactor.html), [VkBlendOp](VkBlendOp.html), `VkBool32`, [VkColorComponentFlags](VkColorComponentFlags.html), [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkPipelineColorBlendAttachmentState).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
