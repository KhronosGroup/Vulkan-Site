# VK_AMD_rasterization_order(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_rasterization_order.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_rasterization_order](#VK_AMD_rasterization_order)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Issues](#_issues_2)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_rasterization_order - device extension

**Name String**

`VK_AMD_rasterization_order`

**Extension Type**

Device extension

**Registered Extension Number**

19

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Daniel Rakos [drakos-amd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_rasterization_order] @drakos-amd%0A*Here describe the issue or question you have about the VK_AMD_rasterization_order extension*)

**Last Modified Date**

2016-04-25

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Jaakko Konttinen, AMD

* 
Daniel Rakos, AMD

* 
Graham Sellers, AMD

* 
Dominik Witczak, AMD

This extension introduces the possibility for the application to control the
order of primitive rasterization.
In unextended Vulkan, the following stages are guaranteed to execute in *API
order*:

* 
depth bounds test

* 
stencil test, stencil op, and stencil write

* 
depth test and depth write

* 
occlusion queries

* 
blending, logic op, and color write

This extension enables applications to opt into a relaxed, implementation
defined primitive rasterization order that may allow better parallel
processing of primitives and thus enabling higher primitive throughput.
It is applicable in cases where the primitive rasterization order is known
to not affect the output of the rendering or any differences caused by a
different rasterization order are not a concern from the point of view of
the application’s purpose.

A few examples of cases when using the relaxed primitive rasterization order
would not have an effect on the final rendering:

* 
If the primitives rendered are known to not overlap in framebuffer
space.

* 
If depth testing is used with a comparison operator of
[VK_COMPARE_OP_LESS](VkCompareOp.html), [VK_COMPARE_OP_LESS_OR_EQUAL](VkCompareOp.html),
[VK_COMPARE_OP_GREATER](VkCompareOp.html), or [VK_COMPARE_OP_GREATER_OR_EQUAL](VkCompareOp.html),
and the primitives rendered are known to not overlap in clip space.

* 
If depth testing is not used and blending is enabled for all attachments
with a commutative blend operator.

* 
Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

[VkPipelineRasterizationStateRasterizationOrderAMD](VkPipelineRasterizationStateRasterizationOrderAMD.html)

* 
[VkRasterizationOrderAMD](VkRasterizationOrderAMD.html)

* 
`VK_AMD_RASTERIZATION_ORDER_EXTENSION_NAME`

* 
`VK_AMD_RASTERIZATION_ORDER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_RASTERIZATION_ORDER_AMD](VkStructureType.html)

1) How is this extension useful to application developers?

**RESOLVED**: Allows them to increase primitive throughput for cases when
strict API order rasterization is not important due to the nature of the
content, the configuration used, or the requirements towards the output of
the rendering.

2) How does this extension interact with content optimizations aiming to
reduce overdraw by appropriately ordering the input primitives?

**RESOLVED**: While the relaxed rasterization order might somewhat limit the
effectiveness of such content optimizations, most of the benefits of it are
expected to be retained even when the relaxed rasterization order is used,
so applications **should** still apply these optimizations even if they intend
to use the extension.

3) Are there any guarantees about the primitive rasterization order when
using the new relaxed mode?

**RESOLVED**: No.
In this case the rasterization order is completely implementation-dependent,
but in practice it is expected to partially still follow the order of
incoming primitives.

4) Does the new relaxed rasterization order have any adverse effect on
repeatability and other invariance rules of the API?

**RESOLVED**: Yes, in the sense that it extends the list of exceptions when
the repeatability requirement does not apply.

None

None

* 
Revision 1, 2016-04-25 (Daniel Rakos)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_rasterization_order).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
