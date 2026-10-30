# VK_EXT_pipeline_creation_feedback(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pipeline_creation_feedback.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pipeline_creation_feedback](#VK_EXT_pipeline_creation_feedback)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pipeline_creation_feedback - device extension

**Name String**

`VK_EXT_pipeline_creation_feedback`

**Extension Type**

Device extension

**Registered Extension Number**

193

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Jean-Francois Roy [jfroy](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pipeline_creation_feedback] @jfroy%0A*Here describe the issue or question you have about the VK_EXT_pipeline_creation_feedback extension*)

**Last Modified Date**

2019-03-12

**IP Status**

No known IP claims.

**Contributors**

* 
Jean-Francois Roy, Google

* 
Hai Nguyen, Google

* 
Andrew Ellem, Google

* 
Bob Fraser, Google

* 
Sujeevan Rajayogam, Google

* 
Jan-Harald Fredriksen, ARM

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Jeff Bolz, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Neil Henning, AMD

This extension adds a mechanism to provide feedback to an application about
pipeline creation, with the specific goal of allowing a feedback loop
between build systems and in-the-field application executions to ensure
effective pipeline caches are shipped to customers.

* 
[VkPipelineCreationFeedbackEXT](VkPipelineCreationFeedback.html)

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

[VkPipelineCreationFeedbackCreateInfoEXT](VkPipelineCreationFeedbackCreateInfo.html)

* 
[VkPipelineCreationFeedbackFlagBitsEXT](VkPipelineCreationFeedbackFlagBits.html)

* 
[VkPipelineCreationFeedbackFlagsEXT](VkPipelineCreationFeedbackFlags.html)

* 
`VK_EXT_PIPELINE_CREATION_FEEDBACK_EXTENSION_NAME`

* 
`VK_EXT_PIPELINE_CREATION_FEEDBACK_SPEC_VERSION`

* 
Extending [VkPipelineCreationFeedbackFlagBits](VkPipelineCreationFeedbackFlagBits.html):

[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT_EXT](VkPipelineCreationFeedbackFlagBits.html)

* 
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT_EXT](VkPipelineCreationFeedbackFlagBits.html)

* 
[VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT_EXT](VkPipelineCreationFeedbackFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
Revision 1, 2019-03-12 (Jean-Francois Roy)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pipeline_creation_feedback).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
