# LaunchIdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/LaunchIdKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

LaunchIdKHR - Launch Id for ray shaders

`LaunchIdKHR`

A variable decorated with the `LaunchIdKHR` decoration will specify the
index of the work item being processed.
One work item is generated for each of the `width` × `height`
× `depth` items dispatched by a
[vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html)
or
[vkCmdTraceRaysNV](vkCmdTraceRaysNV.html)
command.
All shader invocations inherit the same value for variables decorated with
`LaunchIdKHR`.

Valid Usage

* 
[](#VUID-LaunchIdKHR-LaunchIdKHR-04266) VUID-LaunchIdKHR-LaunchIdKHR-04266

The `LaunchIdKHR` decoration **must** be used only within the
`RayGenerationKHR`, `IntersectionKHR`, `AnyHitKHR`,
`ClosestHitKHR`, `MissKHR`, or `CallableKHR` `Execution` `Model`

* 
[](#VUID-LaunchIdKHR-LaunchIdKHR-04267) VUID-LaunchIdKHR-LaunchIdKHR-04267

The variable decorated with `LaunchIdKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-LaunchIdKHR-LaunchIdKHR-04268) VUID-LaunchIdKHR-LaunchIdKHR-04268

The variable decorated with `LaunchIdKHR` **must** be declared as a
three-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
