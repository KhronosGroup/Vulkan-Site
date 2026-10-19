# VK_AMD_pipeline_compiler_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_pipeline_compiler_control.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_pipeline_compiler_control](#VK_AMD_pipeline_compiler_control)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_pipeline_compiler_control - device extension

**Name String**

`VK_AMD_pipeline_compiler_control`

**Extension Type**

Device extension

**Registered Extension Number**

184

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Matthaeus G. Chajdas [anteru](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_pipeline_compiler_control] @anteru%0A*Here describe the issue or question you have about the VK_AMD_pipeline_compiler_control extension*)

**Last Modified Date**

2019-07-26

**IP Status**

No known IP claims.

**Contributors**

* 
Matthaeus G. Chajdas, AMD

* 
Daniel Rakos, AMD

* 
Maciej Jesionowski, AMD

* 
Tobias Hector, AMD

This extension introduces [VkPipelineCompilerControlCreateInfoAMD](VkPipelineCompilerControlCreateInfoAMD.html)
structure that can be chained to a pipeline’s creation information to
specify additional flags that affect pipeline compilation.

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html):

[VkPipelineCompilerControlCreateInfoAMD](VkPipelineCompilerControlCreateInfoAMD.html)

* 
[VkPipelineCompilerControlFlagBitsAMD](VkPipelineCompilerControlFlagBitsAMD.html)

* 
[VkPipelineCompilerControlFlagsAMD](VkPipelineCompilerControlFlagsAMD.html)

* 
`VK_AMD_PIPELINE_COMPILER_CONTROL_EXTENSION_NAME`

* 
`VK_AMD_PIPELINE_COMPILER_CONTROL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PIPELINE_COMPILER_CONTROL_CREATE_INFO_AMD](VkStructureType.html)

None.

None.

* 
Revision 1, 2019-07-26 (Tobias Hector)

Initial revision.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_pipeline_compiler_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
