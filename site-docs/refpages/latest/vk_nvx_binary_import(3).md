# VK_NVX_binary_import(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NVX_binary_import.html

## Table of Contents

- [Name](#_name)
- [VK_NVX_binary_import](#VK_NVX_binary_import)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NVX_binary_import - device extension

**Name String**

`VK_NVX_binary_import`

**Extension Type**

Device extension

**Registered Extension Number**

30

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_EXT_debug_report

**Contact**

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NVX_binary_import] @ewerness-nv%0A*Here describe the issue or question you have about the VK_NVX_binary_import extension*)

* 
Liam Middlebrook [liam-middlebrook](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NVX_binary_import] @liam-middlebrook%0A*Here describe the issue or question you have about the VK_NVX_binary_import extension*)

**Last Modified Date**

2024-11-04

**Contributors**

* 
Eric Werness, NVIDIA

* 
Liam Middlebrook, NVIDIA

This extension allows applications to import CuBIN binaries and execute
them.

|  | There is currently no specification language written for this extension.
| --- | --- |
The links to APIs defined by the extension are to stubs that only include
generated content such as API declarations and implicit valid usage
statements. |

* 
[VkCuFunctionNVX](VkCuFunctionNVX.html)

* 
[VkCuModuleNVX](VkCuModuleNVX.html)

* 
[vkCmdCuLaunchKernelNVX](vkCmdCuLaunchKernelNVX.html)

* 
[vkCreateCuFunctionNVX](vkCreateCuFunctionNVX.html)

* 
[vkCreateCuModuleNVX](vkCreateCuModuleNVX.html)

* 
[vkDestroyCuFunctionNVX](vkDestroyCuFunctionNVX.html)

* 
[vkDestroyCuModuleNVX](vkDestroyCuModuleNVX.html)

* 
[VkCuFunctionCreateInfoNVX](VkCuFunctionCreateInfoNVX.html)

* 
[VkCuLaunchInfoNVX](VkCuLaunchInfoNVX.html)

* 
[VkCuModuleCreateInfoNVX](VkCuModuleCreateInfoNVX.html)

* 
Extending [VkCuModuleCreateInfoNVX](VkCuModuleCreateInfoNVX.html):

[VkCuModuleTexturingModeCreateInfoNVX](VkCuModuleTexturingModeCreateInfoNVX.html)

* 
`VK_NVX_BINARY_IMPORT_EXTENSION_NAME`

* 
`VK_NVX_BINARY_IMPORT_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_CU_FUNCTION_NVX](VkObjectType.html)

* 
[VK_OBJECT_TYPE_CU_MODULE_NVX](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_CU_FUNCTION_CREATE_INFO_NVX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CU_LAUNCH_INFO_NVX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CU_MODULE_CREATE_INFO_NVX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CU_MODULE_TEXTURING_MODE_CREATE_INFO_NVX](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_CU_FUNCTION_NVX_EXT](VkDebugReportObjectTypeEXT.html)

* 
[VK_DEBUG_REPORT_OBJECT_TYPE_CU_MODULE_NVX_EXT](VkDebugReportObjectTypeEXT.html)

* 
Revision 2, 2024-11-04 (Liam Middlebrook)

Add [VkCuModuleTexturingModeCreateInfoNVX](VkCuModuleTexturingModeCreateInfoNVX.html)

Revision 1, 2021-04-09 (Eric Werness)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NVX_binary_import).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
