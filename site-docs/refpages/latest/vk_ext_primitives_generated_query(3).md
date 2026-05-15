# VK_EXT_primitives_generated_query(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_primitives_generated_query.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_primitives_generated_query](#VK_EXT_primitives_generated_query)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_primitives_generated_query - device extension

**Name String**

`VK_EXT_primitives_generated_query`

**Extension Type**

Device extension

**Registered Extension Number**

383

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_primitives_generated_query] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_primitives_generated_query extension*)

**Extension Proposal**

[VK_EXT_primitives_generated_query](../../../../features/latest/features/proposals/VK_EXT_primitives_generated_query.html)

**Last Modified Date**

2022-01-24

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Piers Daniell, NVIDIA

* 
Faith Ekstrand, Collabora

* 
Jan-Harald Fredriksen, Arm

This extension adds support for a new query type to match OpenGL’s
`GL_PRIMITIVES_GENERATED` to support layering.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT](VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT.html)

* 
`VK_EXT_PRIMITIVES_GENERATED_QUERY_EXTENSION_NAME`

* 
`VK_EXT_PRIMITIVES_GENERATED_QUERY_SPEC_VERSION`

* 
Extending [VkQueryType](VkQueryType.html):

[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVES_GENERATED_QUERY_FEATURES_EXT](VkStructureType.html)

1) Can the query from `VK_EXT_transform_feedback` be used instead?

**RESOLVED**: No.
While the query from VK_EXT_transform_feedback can produce the same results
as in this extension, it is only available while transform feedback is
active.
The OpenGL `GL_PRIMITIVES_GENERATED` query is independent from transform
feedback.
Emulation through artificial transform feedback is unnecessarily
inefficient.

2) Can `VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT` be used
instead?

**RESOLVED**: It could, but we prefer the extension for simplicity.
Vulkan requires that only one query be active at a time.
If both the `GL_PRIMITIVES_GENERATED` and the
`GL_CLIPPING_INPUT_PRIMITIVES_ARB` queries need to be simultaneously
enabled, emulation of both through
`VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT` is inconvenient.

3) On some hardware, this query cannot be implemented if
`VkPipelineRasterizationStateCreateInfo`::`rasterizerDiscardEnable`
is enabled.
How will this be handled?

**RESOLVED**: A feature flag is exposed by this extension for this.
On said hardware, the GL implementation disables rasterizer-discard and
achieves the same effect through other means.
It will not be able to do the same in Vulkan due to lack of state
information.
A feature flag is exposed by this extension so the OpenGL implementation on
top of Vulkan would be able to implement a similar workaround.

4) On some hardware, this query cannot be implemented for non-zero query
indices.
How will this be handled?

**RESOLVED**: A feature flag is exposed by this extension for this.
If this feature is not present, the query from `VK_EXT_transform_feedback`
can be used to the same effect.

5) How is the interaction of this extension with
`transformFeedbackRasterizationStreamSelect` handled?

**RESOLVED**: Disallowed for non-zero streams.
In OpenGL, the rasterization stream is always stream zero.

* 
Revision 1, 2021-06-23 (Shahbaz Youssefi)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_primitives_generated_query).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
