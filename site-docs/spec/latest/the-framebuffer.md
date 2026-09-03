# The Framebuffer

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/framebuffer.html

## Table of Contents

- [Blending](#framebuffer-blending)
- [Blend Factors](#framebuffer-blendfactors)
- [Dual-Source Blending](#framebuffer-dsb)
- [Blend Operations](#framebuffer-blendoperations)
- [Advanced Blend Operations](#framebuffer-blend-advanced)
- [Advanced_Blend_Operations](#framebuffer-blend-advanced)
- [Logical Operations](#framebuffer-logicop)
- [Color Write Mask](#framebuffer-color-write-mask)
- [Color_Write_Mask](#framebuffer-color-write-mask)
- [Color Write Enable](#framebuffer-color-write-enable)
- [Color_Write_Enable](#framebuffer-color-write-enable)
- [Framebuffer Query Instructions](#framebuffer-queries)
- [Framebuffer_Query_Instructions](#framebuffer-queries)

## Content

Blending combines the incoming *source* fragment’s R, G, B, and A values
with the *destination* R, G, B, and A values of each sample stored in the
framebuffer at the fragment’s (xf,yf) location.
If any components are missing in the framebuffer attachment, they are
replaced as described in [Component Substitution](images.html#images-component-substitution).
Blending is performed for each color sample covered by the fragment, rather
than just once for each fragment.

Source and destination values are combined according to the
[blend operation](#framebuffer-blendoperations), quadruplets of source and
destination weighting factors determined by the [blend factors](#framebuffer-blendfactors), and a [blend constant](#framebuffer-blendconstants), to
obtain a new set of R, G, B, and A values, as described below.

Blending is computed and applied separately to each color attachment used by
the subpass, with separate controls for each attachment.

Prior to performing the blend operation, signed and unsigned normalized
fixed-point color components undergo an implied conversion to floating-point
as specified by [Conversion from Normalized Fixed-Point to Floating-Point](fundamentals.html#fundamentals-fixedfpconv).
Blending computations are treated as if carried out in floating-point, and
basic blend operations are performed with a precision and dynamic range no
lower than that used to represent destination components.
[Advanced blending operations](#framebuffer-blend-advanced) are performed
with a precision and dynamic range no lower than the smaller of that used to
represent destination components or that used to represent 16-bit
floating-point values.

|  | Blending is only defined for floating-point, UNORM, SNORM, and sRGB formats.
| --- | --- |
Within those formats, the implementation may only support blending on some
subset of them.
Which formats support blending is indicated by
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](formats.html#VkFormatFeatureFlagBits). |

The pipeline blend state is included in the
`VkPipelineColorBlendStateCreateInfo` structure during graphics pipeline
creation:

The `VkPipelineColorBlendStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineColorBlendStateCreateInfo {
    VkStructureType                               sType;
    const void*                                   pNext;
    VkPipelineColorBlendStateCreateFlags          flags;
    VkBool32                                      logicOpEnable;
    VkLogicOp                                     logicOp;
    uint32_t                                      attachmentCount;
    const VkPipelineColorBlendAttachmentState*    pAttachments;
    float                                         blendConstants[4];
} VkPipelineColorBlendStateCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkPipelineColorBlendStateCreateFlagBits](#VkPipelineColorBlendStateCreateFlagBits) specifying additional
color blending information.

* 
`logicOpEnable` controls whether to apply [    Logical Operations](#framebuffer-logicop).

* 
`logicOp` selects which logical operation to apply.

* 
`attachmentCount` is the number of
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState) elements in
`pAttachments`.
It is ignored if the pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](pipelines.html#VkDynamicState), and
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](pipelines.html#VkDynamicState) dynamic states set, and
either [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](pipelines.html#VkDynamicState) set or the
[advancedBlendCoherentOperations](features.html#features-advancedBlendCoherentOperations)
feature is not enabled.

* 
`pAttachments` is a pointer to an array of
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState) structures defining blend
state for each color attachment.
It is ignored if the pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](pipelines.html#VkDynamicState), and
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](pipelines.html#VkDynamicState) dynamic states set, and
either [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](pipelines.html#VkDynamicState) set or the
[advancedBlendCoherentOperations](features.html#features-advancedBlendCoherentOperations)
feature is not enabled.

* 
`blendConstants` is a pointer to an array of four values used as the
R, G, B, and A components of the blend constant that are used in
blending, depending on the [blend factor](#framebuffer-blendfactors).

Valid Usage

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-00605) VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-00605

If the [`independentBlend`](features.html#features-independentBlend) feature is
not enabled, all elements of `pAttachments` **must** be identical

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00606) VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00606

If the [`logicOp`](features.html#features-logicOp) feature is not enabled,
`logicOpEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00607) VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00607

If `logicOpEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), `logicOp` **must** be a valid
[VkLogicOp](#VkLogicOp) value

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-rasterizationOrderColorAttachmentAccess-06465) VUID-VkPipelineColorBlendStateCreateInfo-rasterizationOrderColorAttachmentAccess-06465

If the [    `rasterizationOrderColorAttachmentAccess`](features.html#features-rasterizationOrderColorAttachmentAccess) feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](#VkPipelineColorBlendStateCreateFlagBits)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-07353) VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-07353

If `attachmentCount` is not `0`
, and any of [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](pipelines.html#VkDynamicState), or
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](pipelines.html#VkDynamicState) are not set,
`pAttachments` **must** be a valid pointer to an array of
`attachmentCount` valid [VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)
structures

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-sType-sType) VUID-VkPipelineColorBlendStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pNext-pNext) VUID-VkPipelineColorBlendStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineColorBlendAdvancedStateCreateInfoEXT](#VkPipelineColorBlendAdvancedStateCreateInfoEXT) or [VkPipelineColorWriteCreateInfoEXT](#VkPipelineColorWriteCreateInfoEXT)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-sType-unique) VUID-VkPipelineColorBlendStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-flags-parameter) VUID-VkPipelineColorBlendStateCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineColorBlendStateCreateFlagBits](#VkPipelineColorBlendStateCreateFlagBits) values

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-parameter) VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-parameter

 If `attachmentCount` is not `0`, and `pAttachments` is not `NULL`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState) structures

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineColorBlendStateCreateFlags;

`VkPipelineColorBlendStateCreateFlags` is a bitmask type for setting a
mask of zero or more [VkPipelineColorBlendStateCreateFlagBits](#VkPipelineColorBlendStateCreateFlagBits).

Bits which **can** be set in the
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)::`flags` parameter are:

// Provided by VK_VERSION_1_0, VK_EXT_rasterization_order_attachment_access
typedef enum VkPipelineColorBlendStateCreateFlagBits {
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT = 0x00000001,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_ARM = VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT,
} VkPipelineColorBlendStateCreateFlagBits;

* 
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](#VkPipelineColorBlendStateCreateFlagBits)
specifies that access to color and input attachments will have implicit
framebuffer-local memory dependencies, allowing applications to express
custom blending operations in a fragment shader.

When
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](#VkPipelineColorBlendStateCreateFlagBits)
is included in a pipeline, it forms a framebuffer-local memory dependency
for each fragment generated by draw commands for that pipeline with the
following scopes:

* 
The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes the [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits)
pipeline stage executed by all previous fragments (as defined by
[primitive order](drawing.html#drawing-primitive-order)) in the corresponding
[framebuffer regions](synchronization.html#synchronization-framebuffer-regions) including
those generated by the same draw command.

* 
The second [synchronization    scope](synchronization.html#synchronization-dependencies-scopes) includes the [VK_PIPELINE_STAGE_FRAGMENT_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)
pipeline stage executed by the generated fragment.

* 
The first [access scope](synchronization.html#synchronization-dependencies-access-scopes)
includes all writes to color attachments.

* 
The second [access scope](synchronization.html#synchronization-dependencies-access-scopes)
includes all reads from input attachments.

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
`colorWriteMask` is a bitmask of [VkColorComponentFlagBits](#VkColorComponentFlagBits)
specifying which of the R, G, B, and/or A components are enabled for
writing, as described for the [Color Write    Mask](#framebuffer-color-write-mask).

Valid Usage

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-00608) VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-00608

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `srcColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-00609) VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-00609

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `dstColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-00610) VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-00610

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `srcAlphaBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-00611) VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-00611

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `dstAlphaBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01406) VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01406

If either of `colorBlendOp` or `alphaBlendOp` is an
[advanced blend operation](#framebuffer-blend-advanced), then
`colorBlendOp` **must** equal `alphaBlendOp`

* 
[](#VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01407) VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01407

If
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](limits.html#VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT)::`advancedBlendIndependentBlend`
is [VK_FALSE](fundamentals.html#VK_FALSE) and `colorBlendOp` is an
[advanced blend operation](#framebuffer-blend-advanced), then
`colorBlendOp` **must** be the same for all attachments

* 
[](#VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01408) VUID-VkPipelineColorBlendAttachmentState-advancedBlendIndependentBlend-01408

If
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](limits.html#VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT)::`advancedBlendIndependentBlend`
is [VK_FALSE](fundamentals.html#VK_FALSE) and `alphaBlendOp` is an
[advanced blend operation](#framebuffer-blend-advanced), then
`alphaBlendOp` **must** be the same for all attachments

* 
[](#VUID-VkPipelineColorBlendAttachmentState-advancedBlendAllOperations-01409) VUID-VkPipelineColorBlendAttachmentState-advancedBlendAllOperations-01409

If
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](limits.html#VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT)::`advancedBlendAllOperations`
is [VK_FALSE](fundamentals.html#VK_FALSE), then `colorBlendOp` **must** not be
[VK_BLEND_OP_ZERO_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_OVER_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_OVER_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_IN_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_IN_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_OUT_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_OUT_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_ATOP_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_ATOP_EXT](#VkBlendOp), [VK_BLEND_OP_XOR_EXT](#VkBlendOp),
[VK_BLEND_OP_INVERT_EXT](#VkBlendOp), [VK_BLEND_OP_INVERT_RGB_EXT](#VkBlendOp),
[VK_BLEND_OP_LINEARDODGE_EXT](#VkBlendOp), [VK_BLEND_OP_LINEARBURN_EXT](#VkBlendOp),
[VK_BLEND_OP_VIVIDLIGHT_EXT](#VkBlendOp), [VK_BLEND_OP_LINEARLIGHT_EXT](#VkBlendOp),
[VK_BLEND_OP_PINLIGHT_EXT](#VkBlendOp), [VK_BLEND_OP_HARDMIX_EXT](#VkBlendOp),
[VK_BLEND_OP_PLUS_EXT](#VkBlendOp), [VK_BLEND_OP_PLUS_CLAMPED_EXT](#VkBlendOp),
[VK_BLEND_OP_PLUS_CLAMPED_ALPHA_EXT](#VkBlendOp),
[VK_BLEND_OP_PLUS_DARKER_EXT](#VkBlendOp), [VK_BLEND_OP_MINUS_EXT](#VkBlendOp),
[VK_BLEND_OP_MINUS_CLAMPED_EXT](#VkBlendOp), [VK_BLEND_OP_CONTRAST_EXT](#VkBlendOp),
[VK_BLEND_OP_INVERT_OVG_EXT](#VkBlendOp), [VK_BLEND_OP_RED_EXT](#VkBlendOp),
[VK_BLEND_OP_GREEN_EXT](#VkBlendOp), or [VK_BLEND_OP_BLUE_EXT](#VkBlendOp)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01410) VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-01410

If `colorBlendOp` or `alphaBlendOp` is an
[advanced blend operation](#framebuffer-blend-advanced), then
`colorAttachmentCount` of the subpass this pipeline is compiled
against **must** be less than or equal to
[VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](limits.html#VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT)::`advancedBlendMaxColorAttachments`

* 
[](#VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04454) VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04454

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`constantAlphaColorBlendFactors`
is [VK_FALSE](fundamentals.html#VK_FALSE), `srcColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_CONSTANT_ALPHA](#VkBlendFactor) or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04455) VUID-VkPipelineColorBlendAttachmentState-constantAlphaColorBlendFactors-04455

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`constantAlphaColorBlendFactors`
is [VK_FALSE](fundamentals.html#VK_FALSE), `dstColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_CONSTANT_ALPHA](#VkBlendFactor) or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](#VkBlendFactor)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-srcColorBlendFactor-parameter

 `srcColorBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-dstColorBlendFactor-parameter

 `dstColorBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-parameter) VUID-VkPipelineColorBlendAttachmentState-colorBlendOp-parameter

 `colorBlendOp` **must** be a valid [VkBlendOp](#VkBlendOp) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-srcAlphaBlendFactor-parameter

 `srcAlphaBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-parameter) VUID-VkPipelineColorBlendAttachmentState-dstAlphaBlendFactor-parameter

 `dstAlphaBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-alphaBlendOp-parameter) VUID-VkPipelineColorBlendAttachmentState-alphaBlendOp-parameter

 `alphaBlendOp` **must** be a valid [VkBlendOp](#VkBlendOp) value

* 
[](#VUID-VkPipelineColorBlendAttachmentState-colorWriteMask-parameter) VUID-VkPipelineColorBlendAttachmentState-colorWriteMask-parameter

 `colorWriteMask` **must** be a valid combination of [VkColorComponentFlagBits](#VkColorComponentFlagBits) values

To [dynamically set](pipelines.html#pipelines-dynamic-state) `blendEnable`, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetColorBlendEnableEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkBool32*                             pColorBlendEnables);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the color blending
enable applies.

* 
`attachmentCount` the number of color blending enables in the
`pColorBlendEnables` array.

* 
`pColorBlendEnables` an array of booleans to indicate whether color
blending is enabled for the corresponding attachment.

This command sets the color blending enable of the specified color
attachments for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`blendEnable` values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-None-09423) VUID-vkCmdSetColorBlendEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorBlendEnable`](#features-extendedDynamicState3ColorBlendEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-parameter) VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-pColorBlendEnables-parameter) VUID-vkCmdSetColorBlendEnableEXT-pColorBlendEnables-parameter

 `pColorBlendEnables` **must** be a valid pointer to an array of `attachmentCount` `VkBool32` values

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-recording) VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-videocoding) VUID-vkCmdSetColorBlendEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-attachmentCount-arraylength) VUID-vkCmdSetColorBlendEnableEXT-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetColorBlendEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) color blend factors and
operations, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetColorBlendEquationEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkColorBlendEquationEXT*              pColorBlendEquations);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the color blend factors
and operations apply to.

* 
`attachmentCount` the number of [VkColorBlendEquationEXT](#VkColorBlendEquationEXT)
elements in the `pColorBlendEquations` array.

* 
`pColorBlendEquations` an array of [VkColorBlendEquationEXT](#VkColorBlendEquationEXT)
structs that specify the color blend factors and operations for the
corresponding attachments.

This command sets the color blending factors and operations of the specified
attachments for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`srcColorBlendFactor`,
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`dstColorBlendFactor`,
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`colorBlendOp`,
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`srcAlphaBlendFactor`,
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`dstAlphaBlendFactor`, and
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`alphaBlendOp` values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-None-09423) VUID-vkCmdSetColorBlendEquationEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorBlendEquation`](#features-extendedDynamicState3ColorBlendEquation) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-parameter) VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-pColorBlendEquations-parameter) VUID-vkCmdSetColorBlendEquationEXT-pColorBlendEquations-parameter

 `pColorBlendEquations` **must** be a valid pointer to an array of `attachmentCount` valid [VkColorBlendEquationEXT](#VkColorBlendEquationEXT) structures

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-recording) VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-videocoding) VUID-vkCmdSetColorBlendEquationEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-attachmentCount-arraylength) VUID-vkCmdSetColorBlendEquationEXT-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetColorBlendEquationEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkColorBlendEquationEXT` structure is defined as:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
typedef struct VkColorBlendEquationEXT {
    VkBlendFactor    srcColorBlendFactor;
    VkBlendFactor    dstColorBlendFactor;
    VkBlendOp        colorBlendOp;
    VkBlendFactor    srcAlphaBlendFactor;
    VkBlendFactor    dstAlphaBlendFactor;
    VkBlendOp        alphaBlendOp;
} VkColorBlendEquationEXT;

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
`alphaBlendOp` selects which blend operation is use to calculate the
alpha values to write to the color attachment.

Valid Usage

* 
[](#VUID-VkColorBlendEquationEXT-dualSrcBlend-07357) VUID-VkColorBlendEquationEXT-dualSrcBlend-07357

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `srcColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkColorBlendEquationEXT-dualSrcBlend-07358) VUID-VkColorBlendEquationEXT-dualSrcBlend-07358

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `dstColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkColorBlendEquationEXT-dualSrcBlend-07359) VUID-VkColorBlendEquationEXT-dualSrcBlend-07359

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `srcAlphaBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkColorBlendEquationEXT-dualSrcBlend-07360) VUID-VkColorBlendEquationEXT-dualSrcBlend-07360

If the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is not
enabled, `dstAlphaBlendFactor` **must** not be
[VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkColorBlendEquationEXT-colorBlendOp-07361) VUID-VkColorBlendEquationEXT-colorBlendOp-07361

`colorBlendOp` and `alphaBlendOp` **must** not be
[VK_BLEND_OP_ZERO_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_OVER_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_OVER_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_IN_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_IN_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_OUT_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_OUT_EXT](#VkBlendOp), [VK_BLEND_OP_SRC_ATOP_EXT](#VkBlendOp),
[VK_BLEND_OP_DST_ATOP_EXT](#VkBlendOp), [VK_BLEND_OP_XOR_EXT](#VkBlendOp),
[VK_BLEND_OP_MULTIPLY_EXT](#VkBlendOp), [VK_BLEND_OP_SCREEN_EXT](#VkBlendOp),
[VK_BLEND_OP_OVERLAY_EXT](#VkBlendOp), [VK_BLEND_OP_DARKEN_EXT](#VkBlendOp),
[VK_BLEND_OP_LIGHTEN_EXT](#VkBlendOp), [VK_BLEND_OP_COLORDODGE_EXT](#VkBlendOp),
[VK_BLEND_OP_COLORBURN_EXT](#VkBlendOp), [VK_BLEND_OP_HARDLIGHT_EXT](#VkBlendOp),
[VK_BLEND_OP_SOFTLIGHT_EXT](#VkBlendOp), [VK_BLEND_OP_DIFFERENCE_EXT](#VkBlendOp),
[VK_BLEND_OP_EXCLUSION_EXT](#VkBlendOp), [VK_BLEND_OP_INVERT_EXT](#VkBlendOp),
[VK_BLEND_OP_INVERT_RGB_EXT](#VkBlendOp), [VK_BLEND_OP_LINEARDODGE_EXT](#VkBlendOp),
[VK_BLEND_OP_LINEARBURN_EXT](#VkBlendOp), [VK_BLEND_OP_VIVIDLIGHT_EXT](#VkBlendOp),
[VK_BLEND_OP_LINEARLIGHT_EXT](#VkBlendOp), [VK_BLEND_OP_PINLIGHT_EXT](#VkBlendOp),
[VK_BLEND_OP_HARDMIX_EXT](#VkBlendOp), [VK_BLEND_OP_HSL_HUE_EXT](#VkBlendOp),
[VK_BLEND_OP_HSL_SATURATION_EXT](#VkBlendOp), [VK_BLEND_OP_HSL_COLOR_EXT](#VkBlendOp),
[VK_BLEND_OP_HSL_LUMINOSITY_EXT](#VkBlendOp), [VK_BLEND_OP_PLUS_EXT](#VkBlendOp),
[VK_BLEND_OP_PLUS_CLAMPED_EXT](#VkBlendOp),
[VK_BLEND_OP_PLUS_CLAMPED_ALPHA_EXT](#VkBlendOp),
[VK_BLEND_OP_PLUS_DARKER_EXT](#VkBlendOp), [VK_BLEND_OP_MINUS_EXT](#VkBlendOp),
[VK_BLEND_OP_MINUS_CLAMPED_EXT](#VkBlendOp), [VK_BLEND_OP_CONTRAST_EXT](#VkBlendOp),
[VK_BLEND_OP_INVERT_OVG_EXT](#VkBlendOp), [VK_BLEND_OP_RED_EXT](#VkBlendOp),
[VK_BLEND_OP_GREEN_EXT](#VkBlendOp), or [VK_BLEND_OP_BLUE_EXT](#VkBlendOp)

* 
[](#VUID-VkColorBlendEquationEXT-constantAlphaColorBlendFactors-07362) VUID-VkColorBlendEquationEXT-constantAlphaColorBlendFactors-07362

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`constantAlphaColorBlendFactors`
is [VK_FALSE](fundamentals.html#VK_FALSE), `srcColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_CONSTANT_ALPHA](#VkBlendFactor) or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](#VkBlendFactor)

* 
[](#VUID-VkColorBlendEquationEXT-constantAlphaColorBlendFactors-07363) VUID-VkColorBlendEquationEXT-constantAlphaColorBlendFactors-07363

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`constantAlphaColorBlendFactors`
is [VK_FALSE](fundamentals.html#VK_FALSE), `dstColorBlendFactor` **must** not be
[VK_BLEND_FACTOR_CONSTANT_ALPHA](#VkBlendFactor) or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](#VkBlendFactor)

Valid Usage (Implicit)

* 
[](#VUID-VkColorBlendEquationEXT-srcColorBlendFactor-parameter) VUID-VkColorBlendEquationEXT-srcColorBlendFactor-parameter

 `srcColorBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkColorBlendEquationEXT-dstColorBlendFactor-parameter) VUID-VkColorBlendEquationEXT-dstColorBlendFactor-parameter

 `dstColorBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkColorBlendEquationEXT-colorBlendOp-parameter) VUID-VkColorBlendEquationEXT-colorBlendOp-parameter

 `colorBlendOp` **must** be a valid [VkBlendOp](#VkBlendOp) value

* 
[](#VUID-VkColorBlendEquationEXT-srcAlphaBlendFactor-parameter) VUID-VkColorBlendEquationEXT-srcAlphaBlendFactor-parameter

 `srcAlphaBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkColorBlendEquationEXT-dstAlphaBlendFactor-parameter) VUID-VkColorBlendEquationEXT-dstAlphaBlendFactor-parameter

 `dstAlphaBlendFactor` **must** be a valid [VkBlendFactor](#VkBlendFactor) value

* 
[](#VUID-VkColorBlendEquationEXT-alphaBlendOp-parameter) VUID-VkColorBlendEquationEXT-alphaBlendOp-parameter

 `alphaBlendOp` **must** be a valid [VkBlendOp](#VkBlendOp) value

To [dynamically set](pipelines.html#pipelines-dynamic-state) the color write masks, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetColorWriteMaskEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkColorComponentFlags*                pColorWriteMasks);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the color write masks
apply to.

* 
`attachmentCount` the number of [VkColorComponentFlags](#VkColorComponentFlags) values
in the `pColorWriteMasks` array.

* 
`pColorWriteMasks` an array of [VkColorComponentFlags](#VkColorComponentFlags) values
that specify the color write masks of the corresponding attachments.

This command sets the color write masks of the specified attachments for
subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`colorWriteMask` values used
to create the currently active pipeline.

|  | Formats with bits that are shared between components specified by
| --- | --- |
[VkColorComponentFlagBits](#VkColorComponentFlagBits), such as
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](formats.html#VkFormat), cannot have their channels
individually masked by this functionality; either all components that share
bits have to be enabled, or none of them. |

Valid Usage

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-None-09423) VUID-vkCmdSetColorWriteMaskEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorWriteMask`](#features-extendedDynamicState3ColorWriteMask) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-parameter) VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-pColorWriteMasks-parameter) VUID-vkCmdSetColorWriteMaskEXT-pColorWriteMasks-parameter

 `pColorWriteMasks` **must** be a valid pointer to an array of `attachmentCount` valid combinations of [VkColorComponentFlagBits](#VkColorComponentFlagBits) values

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-recording) VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-videocoding) VUID-vkCmdSetColorWriteMaskEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-attachmentCount-arraylength) VUID-vkCmdSetColorWriteMaskEXT-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetColorWriteMaskEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The source and destination color and alpha blending factors are selected
from the enum:

// Provided by VK_VERSION_1_0
typedef enum VkBlendFactor {
    VK_BLEND_FACTOR_ZERO = 0,
    VK_BLEND_FACTOR_ONE = 1,
    VK_BLEND_FACTOR_SRC_COLOR = 2,
    VK_BLEND_FACTOR_ONE_MINUS_SRC_COLOR = 3,
    VK_BLEND_FACTOR_DST_COLOR = 4,
    VK_BLEND_FACTOR_ONE_MINUS_DST_COLOR = 5,
    VK_BLEND_FACTOR_SRC_ALPHA = 6,
    VK_BLEND_FACTOR_ONE_MINUS_SRC_ALPHA = 7,
    VK_BLEND_FACTOR_DST_ALPHA = 8,
    VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA = 9,
    VK_BLEND_FACTOR_CONSTANT_COLOR = 10,
    VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR = 11,
    VK_BLEND_FACTOR_CONSTANT_ALPHA = 12,
    VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA = 13,
    VK_BLEND_FACTOR_SRC_ALPHA_SATURATE = 14,
    VK_BLEND_FACTOR_SRC1_COLOR = 15,
    VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR = 16,
    VK_BLEND_FACTOR_SRC1_ALPHA = 17,
    VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA = 18,
} VkBlendFactor;

The semantics of the enum values are described in the table below:

| [VkBlendFactor](#VkBlendFactor) | RGB Blend Factors (Sr,Sg,Sb) or (Dr,Dg,Db) | Alpha Blend Factor (Sa or Da) |
| --- | --- | --- |
| [VK_BLEND_FACTOR_ZERO](#VkBlendFactor) | (0,0,0) | 0 |
| [VK_BLEND_FACTOR_ONE](#VkBlendFactor) | (1,1,1) | 1 |
| [VK_BLEND_FACTOR_SRC_COLOR](#VkBlendFactor) | (Rs0,Gs0,Bs0) | As0 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC_COLOR](#VkBlendFactor) | (1-Rs0,1-Gs0,1-Bs0) | 1-As0 |
| [VK_BLEND_FACTOR_DST_COLOR](#VkBlendFactor) | (Rd,Gd,Bd) | Ad |
| [VK_BLEND_FACTOR_ONE_MINUS_DST_COLOR](#VkBlendFactor) | (1-Rd,1-Gd,1-Bd) | 1-Ad |
| [VK_BLEND_FACTOR_SRC_ALPHA](#VkBlendFactor) | (As0,As0,As0) | As0 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC_ALPHA](#VkBlendFactor) | (1-As0,1-As0,1-As0) | 1-As0 |
| [VK_BLEND_FACTOR_DST_ALPHA](#VkBlendFactor) | (Ad,Ad,Ad) | Ad |
| [VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA](#VkBlendFactor) | (1-Ad,1-Ad,1-Ad) | 1-Ad |
| [VK_BLEND_FACTOR_CONSTANT_COLOR](#VkBlendFactor) | (Rc,Gc,Bc) | Ac |
| [VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR](#VkBlendFactor) | (1-Rc,1-Gc,1-Bc) | 1-Ac |
| [VK_BLEND_FACTOR_CONSTANT_ALPHA](#VkBlendFactor) | (Ac,Ac,Ac) | Ac |
| [VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](#VkBlendFactor) | (1-Ac,1-Ac,1-Ac) | 1-Ac |
| [VK_BLEND_FACTOR_SRC_ALPHA_SATURATE](#VkBlendFactor) | (f,f,f); f = min(As0,1-Ad) | 1 |
| [VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor) | (Rs1,Gs1,Bs1) | As1 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor) | (1-Rs1,1-Gs1,1-Bs1) | 1-As1 |
| [VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor) | (As1,As1,As1) | As1 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor) | (1-As1,1-As1,1-As1) | 1-As1 |

In this table, the following conventions are used:

* 
Rs0,Gs0,Bs0 and As0 represent the first source color
R, G, B, and A components, respectively, for the fragment output
location corresponding to the color attachment being blended.

* 
Rs1,Gs1,Bs1 and As1 represent the second source
color R, G, B, and A components, respectively, used in dual source
blending modes, for the fragment output location corresponding to the
color attachment being blended.

* 
Rd,Gd,Bd and Ad represent the R, G, B, and A
components of the destination color.
That is, the color currently in the corresponding color attachment for
this fragment/sample.

* 
Rc,Gc,Bc and Ac represent the blend constant R, G,
B, and A components, respectively.

To [dynamically set and change](pipelines.html#pipelines-dynamic-state) the blend
constants, call:

// Provided by VK_VERSION_1_0
void vkCmdSetBlendConstants(
    VkCommandBuffer                             commandBuffer,
    const float                                 blendConstants[4]);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`blendConstants` is a pointer to an array of four values specifying
the Rc, Gc, Bc, and Ac components of the
blend constant color used in blending, depending on the
[blend factor](#framebuffer-blendfactors).

This command sets blend constants for subsequent drawing commands when
when drawing using [shader objects](shaders.html#shaders-objects), or
the graphics pipeline is created with [VK_DYNAMIC_STATE_BLEND_CONSTANTS](pipelines.html#VkDynamicState)
set in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)::`blendConstants` values used
to create the currently active pipeline.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetBlendConstants-commandBuffer-parameter) VUID-vkCmdSetBlendConstants-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetBlendConstants-commandBuffer-recording) VUID-vkCmdSetBlendConstants-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetBlendConstants-commandBuffer-cmdpool) VUID-vkCmdSetBlendConstants-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetBlendConstants-videocoding) VUID-vkCmdSetBlendConstants-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetBlendConstants is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Blend factors that use the secondary color input
(Rs1,Gs1,Bs1,As1) ([VK_BLEND_FACTOR_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](#VkBlendFactor), and
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#VkBlendFactor)) **may** consume implementation
resources that could otherwise be used for rendering to multiple color
attachments.
Therefore, the number of color attachments that **can** be used in a
framebuffer **may** be lower when using dual-source blending.

Dual-source blending is only supported if the [`dualSrcBlend`](features.html#features-dualSrcBlend) feature is enabled.

The maximum number of color attachments that **can** be used in a subpass when
using dual-source blending functions is implementation-dependent and is
reported as the `maxFragmentDualSrcAttachments` member of
`VkPhysicalDeviceLimits`.

Color outputs **can** be bound to the first and second inputs of the blender
using the `Index` decoration, as described in
[Fragment Output Interface](interfaces.html#interfaces-fragmentoutput).
If the second color input to the blender is not written in the shader, or if
no output is bound to the second input of a blender, the value of the second
input is **undefined**.

Once the source and destination blend factors have been selected, they along
with the source and destination components are passed to the blending
operations.
RGB and alpha components **can** use different operations.
Possible values of [VkBlendOp](#VkBlendOp), specifying the operations, are:

// Provided by VK_VERSION_1_0
typedef enum VkBlendOp {
    VK_BLEND_OP_ADD = 0,
    VK_BLEND_OP_SUBTRACT = 1,
    VK_BLEND_OP_REVERSE_SUBTRACT = 2,
    VK_BLEND_OP_MIN = 3,
    VK_BLEND_OP_MAX = 4,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_ZERO_EXT = 1000148000,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SRC_EXT = 1000148001,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DST_EXT = 1000148002,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SRC_OVER_EXT = 1000148003,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DST_OVER_EXT = 1000148004,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SRC_IN_EXT = 1000148005,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DST_IN_EXT = 1000148006,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SRC_OUT_EXT = 1000148007,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DST_OUT_EXT = 1000148008,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SRC_ATOP_EXT = 1000148009,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DST_ATOP_EXT = 1000148010,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_XOR_EXT = 1000148011,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_MULTIPLY_EXT = 1000148012,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SCREEN_EXT = 1000148013,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_OVERLAY_EXT = 1000148014,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DARKEN_EXT = 1000148015,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_LIGHTEN_EXT = 1000148016,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_COLORDODGE_EXT = 1000148017,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_COLORBURN_EXT = 1000148018,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_HARDLIGHT_EXT = 1000148019,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_SOFTLIGHT_EXT = 1000148020,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_DIFFERENCE_EXT = 1000148021,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_EXCLUSION_EXT = 1000148022,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_INVERT_EXT = 1000148023,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_INVERT_RGB_EXT = 1000148024,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_LINEARDODGE_EXT = 1000148025,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_LINEARBURN_EXT = 1000148026,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_VIVIDLIGHT_EXT = 1000148027,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_LINEARLIGHT_EXT = 1000148028,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_PINLIGHT_EXT = 1000148029,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_HARDMIX_EXT = 1000148030,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_HSL_HUE_EXT = 1000148031,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_HSL_SATURATION_EXT = 1000148032,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_HSL_COLOR_EXT = 1000148033,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_HSL_LUMINOSITY_EXT = 1000148034,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_PLUS_EXT = 1000148035,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_PLUS_CLAMPED_EXT = 1000148036,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_PLUS_CLAMPED_ALPHA_EXT = 1000148037,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_PLUS_DARKER_EXT = 1000148038,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_MINUS_EXT = 1000148039,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_MINUS_CLAMPED_EXT = 1000148040,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_CONTRAST_EXT = 1000148041,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_INVERT_OVG_EXT = 1000148042,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_RED_EXT = 1000148043,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_GREEN_EXT = 1000148044,
  // Provided by VK_EXT_blend_operation_advanced
    VK_BLEND_OP_BLUE_EXT = 1000148045,
} VkBlendOp;

The semantics of the basic blend operations are described in the table
below:

| [VkBlendOp](#VkBlendOp) | RGB Components | Alpha Component |
| --- | --- | --- |
| [VK_BLEND_OP_ADD](#VkBlendOp) | R = Rs0 × Sr +  Rd × Dr

  G = Gs0 × Sg +  Gd × Dg

  B = Bs0 × Sb +  Bd × Db | A = As0 × Sa +  Ad × Da |
| [VK_BLEND_OP_SUBTRACT](#VkBlendOp) | R = Rs0 × Sr - Rd × Dr

  G = Gs0 × Sg - Gd × Dg

  B = Bs0 × Sb - Bd × Db | A = As0 × Sa - Ad × Da |
| [VK_BLEND_OP_REVERSE_SUBTRACT](#VkBlendOp) | R = Rd × Dr - Rs0 × Sr

  G = Gd × Dg - Gs0 × Sg

  B = Bd × Db - Bs0 × Sb | A = Ad × Da - As0 × Sa |
| [VK_BLEND_OP_MIN](#VkBlendOp) | R = min(Rs0,Rd)

  G = min(Gs0,Gd)

  B = min(Bs0,Bd) | A = min(As0,Ad) |
| [VK_BLEND_OP_MAX](#VkBlendOp) | R = max(Rs0,Rd)

  G = max(Gs0,Gd)

  B = max(Bs0,Bd) | A = max(As0,Ad) |

In this table, the following conventions are used:

* 
Rs0, Gs0, Bs0 and As0 represent the first source
color R, G, B, and A components, respectively.

* 
Rd, Gd, Bd and Ad represent the R, G, B, and A
components of the destination color.
That is, the color currently in the corresponding color attachment for
this fragment/sample.

* 
Sr, Sg, Sb and Sa represent the source blend factor
R, G, B, and A components, respectively.

* 
Dr, Dg, Db and Da represent the destination blend
factor R, G, B, and A components, respectively.

The blending operation produces a new set of values R, G, B and
A, which are written to the framebuffer attachment.
If blending is not enabled for this attachment, then R, G, B and
A are assigned Rs0, Gs0, Bs0 and As0,
respectively.

If the color attachment is fixed-point, the components of the source and
destination values and blend factors are each clamped to [0,1] or
[-1,1] respectively for an unsigned normalized or signed normalized
color attachment prior to evaluating the blend operations.
If the color attachment is floating-point, no clamping occurs.

If the [numeric format](formats.html#formats-numericformat) of a framebuffer attachment
uses sRGB encoding, the R, G, and B destination color values (after
conversion from fixed-point to floating-point) are considered to be encoded
for the sRGB color space and hence are linearized prior to their use in
blending.
Each R, G, and B component is converted from nonlinear to linear as
described in the “sRGB EOTF” section of the [Khronos Data Format Specification](introduction.html#data-format).
If the format is not sRGB, no linearization is performed.

If the [numeric format](formats.html#formats-numericformat) of a framebuffer attachment
uses sRGB encoding, then the final R, G, and B values are converted into the
nonlinear sRGB representation before being written to the framebuffer
attachment as described in the “sRGB EOTF -1” section of the
Khronos Data Format Specification.

If the [numeric format](formats.html#formats-numericformat) of a framebuffer color
attachment is not sRGB encoded, then the resulting cs values for R,
G, and B are unmodified.

The value of A is never sRGB encoded.
That is, the alpha component is always stored in memory as linear.

If the framebuffer color attachment is [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED), no writes
are performed through that attachment.
Writes are not performed to framebuffer color attachments greater than or
equal to the `VkSubpassDescription`::`colorAttachmentCount`
or `VkSubpassDescription2`::`colorAttachmentCount`
value.

The *advanced blend operations* are those listed in tables
[f/X/Y/Z Advanced Blend Operations](#framebuffer-blend-advanced-fxyz-modes),
[Hue-Saturation-Luminosity Advanced Blend Operations](#framebuffer-blend-advanced-hsl-modes), and
[Additional RGB Blend Operations](#framebuffer-blend-advanced-additional-rgb).

If the `pNext` chain of [VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)
includes a `VkPipelineColorBlendAdvancedStateCreateInfoEXT` structure,
then that structure includes parameters that affect advanced blend
operations.

The `VkPipelineColorBlendAdvancedStateCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_blend_operation_advanced
typedef struct VkPipelineColorBlendAdvancedStateCreateInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkBool32             srcPremultiplied;
    VkBool32             dstPremultiplied;
    VkBlendOverlapEXT    blendOverlap;
} VkPipelineColorBlendAdvancedStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcPremultiplied` specifies whether the source color of the blend
operation is treated as premultiplied.

* 
`dstPremultiplied` specifies whether the destination color of the
blend operation is treated as premultiplied.

* 
`blendOverlap` is a [VkBlendOverlapEXT](#VkBlendOverlapEXT) value specifying how the
source and destination sample’s coverage is correlated.

If this structure is not present, `srcPremultiplied` and
`dstPremultiplied` are both considered to be [VK_TRUE](fundamentals.html#VK_TRUE), and
`blendOverlap` is considered to be
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](#VkBlendOverlapEXT).

Valid Usage

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-srcPremultiplied-01424) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-srcPremultiplied-01424

If the [non-premultiplied    source color](limits.html#limits-advancedBlendNonPremultipliedSrcColor) property is not supported, `srcPremultiplied` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-dstPremultiplied-01425) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-dstPremultiplied-01425

If the [non-premultiplied    destination color](limits.html#limits-advancedBlendNonPremultipliedDstColor) property is not supported, `dstPremultiplied`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-01426) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-01426

If the [correlated overlap](limits.html#limits-advancedBlendCorrelatedOverlap)
property is not supported, `blendOverlap` **must** be
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](#VkBlendOverlapEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-sType-sType) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_ADVANCED_STATE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-parameter) VUID-VkPipelineColorBlendAdvancedStateCreateInfoEXT-blendOverlap-parameter

 `blendOverlap` **must** be a valid [VkBlendOverlapEXT](#VkBlendOverlapEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the advanced blend state,
call:

// Provided by VK_EXT_blend_operation_advanced with VK_EXT_extended_dynamic_state3, VK_EXT_blend_operation_advanced with VK_EXT_shader_object
void vkCmdSetColorBlendAdvancedEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkColorBlendAdvancedEXT*              pColorBlendAdvanced);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the advanced blend
parameters apply to.

* 
`attachmentCount` the number of [VkColorBlendAdvancedEXT](#VkColorBlendAdvancedEXT)
elements in the `pColorBlendAdvanced` array.

* 
`pColorBlendAdvanced` an array of [VkColorBlendAdvancedEXT](#VkColorBlendAdvancedEXT)
structs that specify the advanced color blend parameters for the
corresponding attachments.

This command sets the advanced blend operation parameters of the specified
attachments for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`srcPremultiplied`,
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`dstPremultiplied`,
and [VkPipelineColorBlendAdvancedStateCreateInfoEXT](#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`blendOverlap`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-None-09423) VUID-vkCmdSetColorBlendAdvancedEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorBlendAdvanced`](#features-extendedDynamicState3ColorBlendAdvanced) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-parameter) VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-pColorBlendAdvanced-parameter) VUID-vkCmdSetColorBlendAdvancedEXT-pColorBlendAdvanced-parameter

 `pColorBlendAdvanced` **must** be a valid pointer to an array of `attachmentCount` valid [VkColorBlendAdvancedEXT](#VkColorBlendAdvancedEXT) structures

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-recording) VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-videocoding) VUID-vkCmdSetColorBlendAdvancedEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-attachmentCount-arraylength) VUID-vkCmdSetColorBlendAdvancedEXT-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetColorBlendAdvancedEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkColorBlendAdvancedEXT` structure is defined as:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
typedef struct VkColorBlendAdvancedEXT {
    VkBlendOp            advancedBlendOp;
    VkBool32             srcPremultiplied;
    VkBool32             dstPremultiplied;
    VkBlendOverlapEXT    blendOverlap;
    VkBool32             clampResults;
} VkColorBlendAdvancedEXT;

* 
`advancedBlendOp` selects which blend operation is used to calculate
the RGB values to write to the color attachment.

* 
`srcPremultiplied` specifies whether the source color of the blend
operation is treated as premultiplied.

* 
`dstPremultiplied` specifies whether the destination color of the
blend operation is treated as premultiplied.

* 
`blendOverlap` is a [VkBlendOverlapEXT](#VkBlendOverlapEXT) value specifying how the
source and destination sample’s coverage is correlated.

* 
`clampResults` specifies that results **must** be clamped to the [0,1]
range before writing to the attachment, which is useful when the
attachment format is not normalized fixed-point.

Valid Usage

* 
[](#VUID-VkColorBlendAdvancedEXT-srcPremultiplied-07505) VUID-VkColorBlendAdvancedEXT-srcPremultiplied-07505

If the [non-premultiplied    source color](limits.html#limits-advancedBlendNonPremultipliedSrcColor) property is not supported, `srcPremultiplied` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkColorBlendAdvancedEXT-dstPremultiplied-07506) VUID-VkColorBlendAdvancedEXT-dstPremultiplied-07506

If the [non-premultiplied    destination color](limits.html#limits-advancedBlendNonPremultipliedDstColor) property is not supported, `dstPremultiplied`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkColorBlendAdvancedEXT-blendOverlap-07507) VUID-VkColorBlendAdvancedEXT-blendOverlap-07507

If the [correlated overlap](limits.html#limits-advancedBlendCorrelatedOverlap)
property is not supported, `blendOverlap` **must** be
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](#VkBlendOverlapEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkColorBlendAdvancedEXT-advancedBlendOp-parameter) VUID-VkColorBlendAdvancedEXT-advancedBlendOp-parameter

 `advancedBlendOp` **must** be a valid [VkBlendOp](#VkBlendOp) value

* 
[](#VUID-VkColorBlendAdvancedEXT-blendOverlap-parameter) VUID-VkColorBlendAdvancedEXT-blendOverlap-parameter

 `blendOverlap` **must** be a valid [VkBlendOverlapEXT](#VkBlendOverlapEXT) value

When using one of the operations in table
[f/X/Y/Z Advanced Blend Operations](#framebuffer-blend-advanced-fxyz-modes)
or [Hue-Saturation-Luminosity Advanced Blend Operations](#framebuffer-blend-advanced-hsl-modes), blending is performed according to the following
equations:

  

  

where the function f and terms X, Y, and Z are specified in the table.
The R, G, and B components of the source color used for blending are derived
according to `srcPremultiplied`.
If `srcPremultiplied` is [VK_TRUE](fundamentals.html#VK_TRUE), the fragment color components
are considered to have been premultiplied by the A component prior to
blending.
The base source color (Rs',Gs',Bs') is obtained by dividing
through by the A component:

  

  

If `srcPremultiplied` is [VK_FALSE](fundamentals.html#VK_FALSE), the fragment color components
are used as the base color:

  

  

The R, G, and B components of the destination color used for blending are
derived according to `dstPremultiplied`.
If `dstPremultiplied` is [VK_TRUE](fundamentals.html#VK_TRUE), the destination components are
considered to have been premultiplied by the A component prior to blending.
The base destination color (Rd',Gd',Bd') is obtained by dividing
through by the A component:

  

  

If `dstPremultiplied` is [VK_FALSE](fundamentals.html#VK_FALSE), the destination color
components are used as the base color:

  

  

When blending using advanced blend operations, we expect that the R, G, and
B components of premultiplied source and destination color inputs be stored
as the product of non-premultiplied R, G, and B component values and the A
component of the color.
If any R, G, or B component of a premultiplied input color is non-zero and
the A component is zero, the color is considered ill-formed, and the
corresponding component of the blend result is **undefined**.

All of the advanced blend operation formulas in this chapter compute the
result as a premultiplied color.
If `dstPremultiplied` is [VK_FALSE](fundamentals.html#VK_FALSE), that result color’s R, G, and B
components are divided by the A component before being written to the
framebuffer.
If any R, G, or B component of the color is non-zero and the A component is
zero, the result is considered ill-formed, and the corresponding component
of the blend result is **undefined**.
If all components are zero, that value is unchanged.

If the A component of any input or result color is less than zero, the color
is considered ill-formed, and all components of the blend result are
**undefined**.

The weighting functions p0, p1, and p2 are defined
in table [Advanced Blend Overlap Modes](#framebuffer-blend-advanced-overlap-modes).
In these functions, the A components of the source and destination colors
are taken to indicate the portion of the pixel covered by the fragment
(source) and the fragments previously accumulated in the pixel
(destination).
The functions p0, p1, and p2 approximate the
relative portion of the pixel covered by the intersection of the source and
destination, covered only by the source, and covered only by the
destination, respectively.

Possible values of
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`blendOverlap`,
specifying the blend overlap functions, are:

// Provided by VK_EXT_blend_operation_advanced
typedef enum VkBlendOverlapEXT {
    VK_BLEND_OVERLAP_UNCORRELATED_EXT = 0,
    VK_BLEND_OVERLAP_DISJOINT_EXT = 1,
    VK_BLEND_OVERLAP_CONJOINT_EXT = 2,
} VkBlendOverlapEXT;

* 
[VK_BLEND_OVERLAP_UNCORRELATED_EXT](#VkBlendOverlapEXT) specifies that there is no
correlation between the source and destination coverage.

* 
[VK_BLEND_OVERLAP_CONJOINT_EXT](#VkBlendOverlapEXT) specifies that the source and
destination coverage are considered to have maximal overlap.

* 
[VK_BLEND_OVERLAP_DISJOINT_EXT](#VkBlendOverlapEXT) specifies that the source and
destination coverage are considered to have minimal overlap.

| Overlap Mode | Weighting Equations |
| --- | --- |
| [VK_BLEND_OVERLAP_UNCORRELATED_EXT](#VkBlendOverlapEXT) |  |
| [VK_BLEND_OVERLAP_CONJOINT_EXT](#VkBlendOverlapEXT) |  |
| [VK_BLEND_OVERLAP_DISJOINT_EXT](#VkBlendOverlapEXT) |  |

| Mode | Blend Coefficients |
| --- | --- |
| [VK_BLEND_OP_ZERO_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SRC_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DST_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SRC_OVER_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DST_OVER_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SRC_IN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DST_IN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SRC_OUT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DST_OUT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SRC_ATOP_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DST_ATOP_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_XOR_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_MULTIPLY_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SCREEN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_OVERLAY_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DARKEN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_LIGHTEN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_COLORDODGE_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_COLORBURN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_HARDLIGHT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_SOFTLIGHT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_DIFFERENCE_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_EXCLUSION_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_INVERT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_INVERT_RGB_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_LINEARDODGE_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_LINEARBURN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_VIVIDLIGHT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_LINEARLIGHT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_PINLIGHT_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_HARDMIX_EXT](#VkBlendOp) |  |

When using one of the HSL blend operations in table
[Hue-Saturation-Luminosity Advanced Blend Operations](#framebuffer-blend-advanced-hsl-modes) as the blend operation, the RGB color components produced
by the function f are effectively obtained by converting both the
non-premultiplied source and destination colors to the HSL (hue, saturation,
luminosity) color space, generating a new HSL color by selecting H, S, and L
components from the source or destination according to the blend operation,
and then converting the result back to RGB.
In the equations below, a blended RGB color is produced according to the
following pseudocode:

  float minv3(vec3 c) {
    return min(min(c.r, c.g), c.b);
  }
  float maxv3(vec3 c) {
    return max(max(c.r, c.g), c.b);
  }
  float lumv3(vec3 c) {
    return dot(c, vec3(0.30, 0.59, 0.11));
  }
  float satv3(vec3 c) {
    return maxv3(c) - minv3(c);
  }

  // If any color components are outside [0,1], adjust the color to
  // get the components in range.
  vec3 ClipColor(vec3 color) {
    float lum = lumv3(color);
    float mincol = minv3(color);
    float maxcol = maxv3(color);
    if (mincol  1.0) {
      color = lum + ((color-lum)*(1-lum)) / (maxcol-lum);
    }
    return color;
  }

  // Take the base RGB color  and override its luminosity
  // with that of the RGB color .
  vec3 SetLum(vec3 cbase, vec3 clum) {
    float lbase = lumv3(cbase);
    float llum = lumv3(clum);
    float ldiff = llum - lbase;
    vec3 color = cbase + vec3(ldiff);
    return ClipColor(color);
  }

  // Take the base RGB color  and override its saturation with
  // that of the RGB color .  The override the luminosity of the
  // result with that of the RGB color .
  vec3 SetLumSat(vec3 cbase, vec3 csat, vec3 clum)
  {
    float minbase = minv3(cbase);
    float sbase = satv3(cbase);
    float ssat = satv3(csat);
    vec3 color;
    if (sbase > 0) {
      // Equivalent (modulo rounding errors) to setting the
      // smallest (R,G,B) component to 0, the largest to ,
      // and interpolating the "middle" component based on its
      // original value relative to the smallest/largest.
      color = (cbase - minbase) * ssat / sbase;
    } else {
      color = vec3(0.0);
    }
    return SetLum(color, clum);
  }

| Mode | Result |
| --- | --- |
| [VK_BLEND_OP_HSL_HUE_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_HSL_SATURATION_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_HSL_COLOR_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_HSL_LUMINOSITY_EXT](#VkBlendOp) |  |

When using one of the operations in table
[Additional RGB Blend Operations](#framebuffer-blend-advanced-additional-rgb) as the blend operation, the source and destination colors used
by these blending operations are interpreted according to
`srcPremultiplied` and `dstPremultiplied`.
The blending operations below are evaluated where the RGB source and
destination color components are both considered to have been premultiplied
by the corresponding A component.

  

  

| Mode | Result |
| --- | --- |
| [VK_BLEND_OP_PLUS_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_PLUS_CLAMPED_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_PLUS_CLAMPED_ALPHA_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_PLUS_DARKER_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_MINUS_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_MINUS_CLAMPED_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_CONTRAST_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_INVERT_OVG_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_RED_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_GREEN_EXT](#VkBlendOp) |  |
| [VK_BLEND_OP_BLUE_EXT](#VkBlendOp) |  |

The application **can** enable a *logical operation* between the fragment’s
color values and the existing value in the framebuffer attachment.
This logical operation is applied prior to updating the framebuffer
attachment.
Logical operations are applied only for signed and unsigned integer and
normalized integer framebuffers.
Logical operations are not applied to floating-point or sRGB format color
attachments.

Logical operations are controlled by the `logicOpEnable` and
`logicOp` members of [VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo).
The `logicOpEnable` state can also be controlled by
[vkCmdSetLogicOpEnableEXT](#vkCmdSetLogicOpEnableEXT) if graphics pipeline is created with
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
The `logicOp` state can also be controlled by [vkCmdSetLogicOpEXT](#vkCmdSetLogicOpEXT)
if graphics pipeline is created with [VK_DYNAMIC_STATE_LOGIC_OP_EXT](pipelines.html#VkDynamicState) set
in [VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
If `logicOpEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), then a logical operation selected
by `logicOp` is applied between each color attachment and the fragment’s
corresponding output value, and blending of all attachments is treated as if
it were disabled.
Any attachments using color formats for which logical operations are not
supported simply pass through the color values unmodified.
The logical operation is applied independently for each of the red, green,
blue, and alpha components.
The `logicOp` is selected from the following operations:

// Provided by VK_VERSION_1_0
typedef enum VkLogicOp {
    VK_LOGIC_OP_CLEAR = 0,
    VK_LOGIC_OP_AND = 1,
    VK_LOGIC_OP_AND_REVERSE = 2,
    VK_LOGIC_OP_COPY = 3,
    VK_LOGIC_OP_AND_INVERTED = 4,
    VK_LOGIC_OP_NO_OP = 5,
    VK_LOGIC_OP_XOR = 6,
    VK_LOGIC_OP_OR = 7,
    VK_LOGIC_OP_NOR = 8,
    VK_LOGIC_OP_EQUIVALENT = 9,
    VK_LOGIC_OP_INVERT = 10,
    VK_LOGIC_OP_OR_REVERSE = 11,
    VK_LOGIC_OP_COPY_INVERTED = 12,
    VK_LOGIC_OP_OR_INVERTED = 13,
    VK_LOGIC_OP_NAND = 14,
    VK_LOGIC_OP_SET = 15,
} VkLogicOp;

The logical operations supported by Vulkan are summarized in the following
table in which

* 
¬ is bitwise invert,

* 
∧ is bitwise and,

* 
∨ is bitwise or,

* 
⊕ is bitwise exclusive or,

* 
s is the fragment’s Rs0, Gs0, Bs0 or As0
component value for the fragment output corresponding to the color
attachment being updated, and

* 
d is the color attachment’s R, G, B or A component
value:

| Mode | Operation |
| --- | --- |
| [VK_LOGIC_OP_CLEAR](#VkLogicOp) | 0 |
| [VK_LOGIC_OP_AND](#VkLogicOp) | s ∧ d |
| [VK_LOGIC_OP_AND_REVERSE](#VkLogicOp) | s ∧ ¬ d |
| [VK_LOGIC_OP_COPY](#VkLogicOp) | s |
| [VK_LOGIC_OP_AND_INVERTED](#VkLogicOp) | ¬ s ∧ d |
| [VK_LOGIC_OP_NO_OP](#VkLogicOp) | d |
| [VK_LOGIC_OP_XOR](#VkLogicOp) | s ⊕ d |
| [VK_LOGIC_OP_OR](#VkLogicOp) | s ∨ d |
| [VK_LOGIC_OP_NOR](#VkLogicOp) | ¬ (s ∨ d) |
| [VK_LOGIC_OP_EQUIVALENT](#VkLogicOp) | ¬ (s ⊕ d) |
| [VK_LOGIC_OP_INVERT](#VkLogicOp) | ¬ d |
| [VK_LOGIC_OP_OR_REVERSE](#VkLogicOp) | s ∨ ¬ d |
| [VK_LOGIC_OP_COPY_INVERTED](#VkLogicOp) | ¬ s |
| [VK_LOGIC_OP_OR_INVERTED](#VkLogicOp) | ¬ s ∨ d |
| [VK_LOGIC_OP_NAND](#VkLogicOp) | ¬ (s ∧ d) |
| [VK_LOGIC_OP_SET](#VkLogicOp) | all 1s |

The result of the logical operation is then written to the color attachment
as controlled by the component write mask, described in
[Blend Operations](#framebuffer-blendoperations).

To [dynamically set](pipelines.html#pipelines-dynamic-state) whether logical operations
are enabled, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetLogicOpEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    logicOpEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`logicOpEnable` specifies whether logical operations are enabled.

This command sets whether logical operations are enabled for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)::`logicOpEnable` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLogicOpEnableEXT-None-09423) VUID-vkCmdSetLogicOpEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3LogicOpEnable`](#features-extendedDynamicState3LogicOpEnable) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetLogicOpEnableEXT-logicOp-07366) VUID-vkCmdSetLogicOpEnableEXT-logicOp-07366

If the [`logicOp`](features.html#features-logicOp) feature is not enabled,
`logicOpEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLogicOpEnableEXT-commandBuffer-parameter) VUID-vkCmdSetLogicOpEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetLogicOpEnableEXT-commandBuffer-recording) VUID-vkCmdSetLogicOpEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLogicOpEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetLogicOpEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetLogicOpEnableEXT-videocoding) VUID-vkCmdSetLogicOpEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetLogicOpEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To [dynamically set](pipelines.html#pipelines-dynamic-state) the logical operation to
apply for blend state, call:

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
void vkCmdSetLogicOpEXT(
    VkCommandBuffer                             commandBuffer,
    VkLogicOp                                   logicOp);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`logicOp` specifies the logical operation to apply for blend state.

This command sets the logical operation for blend state for subsequent
drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)::`logicOp` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLogicOpEXT-None-09422) VUID-vkCmdSetLogicOpEXT-None-09422

At least one of the following **must** be true:

The [`extendedDynamicState2LogicOp`](#features-extendedDynamicState2LogicOp) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLogicOpEXT-commandBuffer-parameter) VUID-vkCmdSetLogicOpEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetLogicOpEXT-logicOp-parameter) VUID-vkCmdSetLogicOpEXT-logicOp-parameter

 `logicOp` **must** be a valid [VkLogicOp](#VkLogicOp) value

* 
[](#VUID-vkCmdSetLogicOpEXT-commandBuffer-recording) VUID-vkCmdSetLogicOpEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLogicOpEXT-commandBuffer-cmdpool) VUID-vkCmdSetLogicOpEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetLogicOpEXT-videocoding) VUID-vkCmdSetLogicOpEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetLogicOpEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Bits which **can** be set in
[VkPipelineColorBlendAttachmentState](#VkPipelineColorBlendAttachmentState)::`colorWriteMask`, determining
whether the final color values R, G, B and A are written to the
framebuffer attachment, are:

// Provided by VK_VERSION_1_0
typedef enum VkColorComponentFlagBits {
    VK_COLOR_COMPONENT_R_BIT = 0x00000001,
    VK_COLOR_COMPONENT_G_BIT = 0x00000002,
    VK_COLOR_COMPONENT_B_BIT = 0x00000004,
    VK_COLOR_COMPONENT_A_BIT = 0x00000008,
} VkColorComponentFlagBits;

* 
[VK_COLOR_COMPONENT_R_BIT](#VkColorComponentFlagBits) specifies that the R value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

* 
[VK_COLOR_COMPONENT_G_BIT](#VkColorComponentFlagBits) specifies that the G value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

* 
[VK_COLOR_COMPONENT_B_BIT](#VkColorComponentFlagBits) specifies that the B value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

* 
[VK_COLOR_COMPONENT_A_BIT](#VkColorComponentFlagBits) specifies that the A value is
written to the color attachment for the appropriate sample.
Otherwise, the value in memory is unmodified.

The color write mask operation is applied regardless of whether blending is
enabled.

The color write mask operation is applied only if
[Color Write Enable](#framebuffer-color-write-enable) is enabled for the
respective attachment.
Otherwise the color write mask is ignored and writes to all components of
the attachment are disabled.

// Provided by VK_VERSION_1_0
typedef VkFlags VkColorComponentFlags;

`VkColorComponentFlags` is a bitmask type for setting a mask of zero or
more [VkColorComponentFlagBits](#VkColorComponentFlagBits).

The `VkPipelineColorWriteCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_color_write_enable
typedef struct VkPipelineColorWriteCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           attachmentCount;
    const VkBool32*    pColorWriteEnables;
} VkPipelineColorWriteCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentCount` is the number of `VkBool32` elements in
`pColorWriteEnables`.

* 
`pColorWriteEnables` is a pointer to an array of per target
attachment boolean values specifying whether color writes are enabled
for the given attachment.

When this structure is included in the `pNext` chain of
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo), it defines per-attachment color
write state.
If this structure is not included in the `pNext` chain, it is equivalent
to specifying this structure with `attachmentCount` equal to the
`attachmentCount` member of [VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo),
and `pColorWriteEnables` pointing to an array of as many [VK_TRUE](fundamentals.html#VK_TRUE)
values.

If the [`colorWriteEnable`](features.html#features-colorWriteEnable) feature is not
enabled, all `VkBool32` elements in the `pColorWriteEnables`
array **must** be [VK_TRUE](fundamentals.html#VK_TRUE).

Color Write Enable interacts with the [Color Write Mask](#framebuffer-color-write-mask) as follows:

* 
If `colorWriteEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), writes to the attachment are
determined by the `colorWriteMask`.

* 
If `colorWriteEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the `colorWriteMask` is
ignored and writes to all components of the attachment are disabled.
This is equivalent to specifying a `colorWriteMask` of 0.

Valid Usage

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-pAttachments-04801) VUID-VkPipelineColorWriteCreateInfoEXT-pAttachments-04801

If the [`colorWriteEnable`](features.html#features-colorWriteEnable) feature is
not enabled, all elements of `pColorWriteEnables` **must** be
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-07608) VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-07608

If the pipeline is being created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](pipelines.html#VkDynamicState), or
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](pipelines.html#VkDynamicState) dynamic states not set,
`attachmentCount` **must** be equal to the `attachmentCount` member
of the `VkPipelineColorBlendStateCreateInfo` structure specified
during pipeline creation

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-06655) VUID-VkPipelineColorWriteCreateInfoEXT-attachmentCount-06655

`attachmentCount` **must** be less than or equal to the
`maxColorAttachments` member of `VkPhysicalDeviceLimits`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-sType-sType) VUID-VkPipelineColorWriteCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COLOR_WRITE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineColorWriteCreateInfoEXT-pColorWriteEnables-parameter) VUID-VkPipelineColorWriteCreateInfoEXT-pColorWriteEnables-parameter

 If `attachmentCount` is not `0`, `pColorWriteEnables` **must** be a valid pointer to an array of `attachmentCount` `VkBool32` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineColorBlendStateCreateInfo](#VkPipelineColorBlendStateCreateInfo)

To [dynamically enable or disable](pipelines.html#pipelines-dynamic-state) writes to a
color attachment, call:

// Provided by VK_EXT_color_write_enable
void vkCmdSetColorWriteEnableEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    attachmentCount,
    const VkBool32*                             pColorWriteEnables);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`attachmentCount` is the number of `VkBool32` elements in
`pColorWriteEnables`.

* 
`pColorWriteEnables` is a pointer to an array of per target
attachment boolean values specifying whether color writes are enabled
for the given attachment.

This command sets the color write enables for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorWriteCreateInfoEXT](#VkPipelineColorWriteCreateInfoEXT)::`pColorWriteEnables` values
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-None-04803) VUID-vkCmdSetColorWriteEnableEXT-None-04803

The [`colorWriteEnable`](features.html#features-colorWriteEnable) feature **must**
be enabled

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-06656) VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-06656

`attachmentCount` **must** be less than or equal to the
`maxColorAttachments` member of `VkPhysicalDeviceLimits`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-parameter) VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-pColorWriteEnables-parameter) VUID-vkCmdSetColorWriteEnableEXT-pColorWriteEnables-parameter

 `pColorWriteEnables` **must** be a valid pointer to an array of `attachmentCount` `VkBool32` values

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-recording) VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-videocoding) VUID-vkCmdSetColorWriteEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-arraylength) VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetColorWriteEnableEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

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
[VkTilePropertiesQCOM](renderpass.html#VkTilePropertiesQCOM) structures.

If `pProperties` is `NULL`, then the number of tile properties available
is returned in `pPropertiesCount`.
Otherwise, `pPropertiesCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of properties actually
written to `pProperties`.
If `pPropertiesCount` is less than the number of tile properties
available, at most `pPropertiesCount` structures will be written, and
[VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available properties were returned.

The number of tile properties available is determined by the number of
merged subpasses, and each tile property is associated with a merged
subpass.
There will be at most as many properties as there are subpasses within the
render pass.
To obtain the tile properties for a given merged subpass, the `pProperties`
array can be indexed using the `postMergeIndex` value provided in
[VkRenderPassSubpassFeedbackInfoEXT](renderpass.html#VkRenderPassSubpassFeedbackInfoEXT).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-device-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parameter

 `framebuffer` **must** be a valid [VkFramebuffer](renderpass.html#VkFramebuffer) handle

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-pPropertiesCount-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-pPropertiesCount-parameter

 `pPropertiesCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-pProperties-parameter) VUID-vkGetFramebufferTilePropertiesQCOM-pProperties-parameter

 If the value referenced by `pPropertiesCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertiesCount` [VkTilePropertiesQCOM](renderpass.html#VkTilePropertiesQCOM) structures

* 
[](#VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parent) VUID-vkGetFramebufferTilePropertiesQCOM-framebuffer-parent

 `framebuffer` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)
