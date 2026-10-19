# Introduction

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/introduction.html

## Table of Contents

- [Changes](#changes)
- [Changes from GLSL 4.6 revision 8](#_changes_from_glsl_4_6_revision_8)
- [Changes_from_GLSL_4.6_revision_8](#_changes_from_glsl_4_6_revision_8)
- [Changes from GLSL 4.6 revision 7](#_changes_from_glsl_4_6_revision_7)
- [Changes_from_GLSL_4.6_revision_7](#_changes_from_glsl_4_6_revision_7)
- [Changes from GLSL 4.6 revision 6](#_changes_from_glsl_4_6_revision_6)
- [Changes_from_GLSL_4.6_revision_6](#_changes_from_glsl_4_6_revision_6)
- [Changes from GLSL 4.6 revision 5](#_changes_from_glsl_4_6_revision_5)
- [Changes_from_GLSL_4.6_revision_5](#_changes_from_glsl_4_6_revision_5)
- [Changes from GLSL 4.6 revision 4](#_changes_from_glsl_4_6_revision_4)
- [Changes_from_GLSL_4.6_revision_4](#_changes_from_glsl_4_6_revision_4)
- [Changes from GLSL 4.6 revision 3](#_changes_from_glsl_4_6_revision_3)
- [Changes_from_GLSL_4.6_revision_3](#_changes_from_glsl_4_6_revision_3)
- [Summary of Changes from Revision 7 of GLSL Version 4.50](#_summary_of_changes_from_revision_7_of_glsl_version_4_50)
- [Summary_of_Changes_from_Revision_7_of_GLSL_Version_4.50](#_summary_of_changes_from_revision_7_of_glsl_version_4_50)
- [Overview](#overview)
- [Error Handling](#error-handling)
- [Typographical Conventions](#typographical-conventions)
- [Deprecation](#deprecation)

## Content

This document specifies only version 4.60 of the OpenGL Shading Language (GLSL).
It requires __VERSION__ to substitute 460, and requires
**#version** to accept only
`460`.
If **#version** is declared with a smaller number, the language accepted is a
previous version of the shading language, which will be supported depending
on the version and type of context in the API.
See the [normative references](references.html#references) for details on what language
versions are supported.

Previous versions of the OpenGL Shading Language, as well as the OpenGL ES Shading Language,
are not strict subsets of the version specified here, particularly with
respect to precision, name-hiding rules, and treatment of interface
variables.
See the specification corresponding to a particular language version for
details specific to that version of the language.

Throughout, when generating SPIR-V for consumption by the Vulkan API
(see [normative references](references.html#references)), this will be said to be
*targeting Vulkan*.

While this specification and the OpenGL Specification are normative for OpenGL Shading Language, for
SPIR-V generation it is still the SPIR-V specification and the SPIR-V client
API specification that are normative for the generated SPIR-V.
See the [normative references](references.html#references) for further detail.

For SPIR-V generation, the SPIR-V client API specifies the commands used to
manipulate SPIR-V shaders.

Independent offline tool chains will compile GLSL down to the SPIR-V
intermediate language.
SPIR-V generation is not enabled with a **#extension**, **#version**, or a
profile.
Instead, use of GLSL for SPIR-V is determined by offline tool-chain use.
See the documentation of such tools to see how to request generation of
SPIR-V for its client API.

GLSL → SPIR-V compilers must be directed as to what SPIR-V **Capabilities**
are legal at run-time and give errors for GLSL feature use outside those
capabilities.
This is also true for implementation-dependent limits that can be error
checked by the front-end against built-in constants present in the GLSL
source: the front-end can be informed of such limits, and report errors when
they are exceeded.

SPIR-V features that are not controlled by a SPIR-V capability, but do have an
equivalent GLSL counterpart (stages, built-in functions, types, limits, etc.)
are only expected to work on OpenGL drivers that support the GLSL counterpart.

All references in this specification to the [OpenGL Specification](references.html#references) are to
the Core profile of version 4.6, unless a different profile is
specified.

* 
Public GLSL issue #198: Clarify that logical operators operate only on scalars.

* 
Private GLSL issue #59: Fix incorrect domain of **atanh** function.

* 
Private GLSL issue #66: Add a note clarifying that uninitialized **out** parameters
will be copied, causing function arguments to become undefined.

* 
Private GLSL issue #68: Clarifying changes to the “[Arrays](variables.html#arrays)” section.
The section is reorganised for ease of editing and certain rules are clarified.
The rules for unsized arrays are included for ES even though they cannot be
declared because they apply to certain pre-declared uses.

* 
Private GLSL issue #57: Clarify that **imageLoad** precision is determined (where
applicable) only by the precision of the image argument.

* 
Public GLSL issue #164: Clarify the precision expected from **mod**.

* 
Public GLSL issue #8: Clarify when compute-shader variables may be accessed.

* 
Public GLSL issue #13: Clarify bit-width requirements for location aliasing.

* 
Public GLSL issue #161: Fix incorrect layout qualifier example.

* 
Private GLSL issue #30: Clarify that struct members' precision is always fixed
as part of the struct type declaration.

* 
Private GLSL issue #49: Clarify support for unary **+**.

* 
Private GLSL issue #43: Clarify precisions of constructors.

* 
Private GLSL issue #53: Clarify which qualifiers are allowed on
[Interface Blocks](variables.html#interface-blocks).

* 
Private GLSL issue #31: Removed incorrect example of 'invariant' applied to
'in' variable.

* 
Fix public GLSL issue #83: It is only opaque-type variables that are
required to keep their memory qualifiers (e.g., **readonly**) when
passed to a user-defined function.

* 
Clarify error conditions when declaring atomic counters.

* 
Subnormal values might be flushed to 0.0 by **intBitsToFloat**().

* 
Clarified that 'precise' cannot qualify structure definitions.

* 
Private Bugzilla #15755: Clarify storage size of precision qualified
[interface block](variables.html#interface-blocks) members in application visible memory.

* 
Incorporated the GL_KHR_vulkan_glsl specification.

* 
Add note in the introduction about presence in drivers of SPIR-V features,
as they relate to GLSL features.

* 
Clarify it is same location that triggers default-uniform block matching
rules.
See [Uniform Variable Layout Qualifiers](variables.html#uniform-variable-layout-qualifiers).

* 
Private GLSL issue #34: Clarify/consolidate implicit conversion rules from int → uint
to be the same as explicit construction.

* 
Private GLSL issue #24: Clarify that **barrier**() by itself is enough to synchronize
both control flow and memory accesses to **shared** variables and tessellation
control output variables. For other memory accesses an additional memory
barrier is still required.

* 
Normatively reference IEEE-754 for definitions of floating-point formats.

* 
Private GLSL issue 36: **refract** function on **double** types requires eta
argument to have type **double**.

* 
Clarify restrictions on input variables in tessellation and geometry stages.

* 
Private GLSL issue 15: Clarify the ordering of bindings for arrays of arrays.

* 
Private GLSL issue 14: Uniform variables need only match at link time if they
are statically used.

* 
For **precise** computations, the controlling expressions for
control flow and ternary operators (**?:**) are not included.

* 
Private bug 13012: Clarified that builtin uniform variables might only
be available in the fragment stage.

* 
Private bug 13837: Ternary and sequence operators may operate on **void** types.

* 
Clarified that errors arising from preprocessing must be returned at compile time.

* 
Clarified that access to any part of a variable constitutes a static use.

* 
Private GLSL issue 19: A statement is required following any label at the end of a **switch**.

* 
Private GLSL issue 26: **noise** is not valid when compiling for SPIR-V.

* 
Private GLSL issue 20: **length**() expressions returning a constant value may not
contain side effects.

* 
Public OpenGL-API issue 7: Variables can be declared as both **readonly**
and **writeonly**.

* 
Private GLSL issue 16: Use of constant expressions within **#line** directives is undefined.

* 
Corrected return type of **imageAtomicExchange** on **float** images.

* 
Private GLSL issue 32: Remove **length**() method contradiction:
Non runtime-sized arrays only support **length**() on explicitly
sized arrays.

* 
Private GLSL issue 21: Clarified the l-value restriction on **interpolateAt**.

* 
Private OpenGL-API issue 53: Clarified bit-width requirements for location aliasing.

* 
Public GLSL issue 15: **gl_in** can be redeclared using unsized-array syntax.

* 
Clarification of the formats needed for DEPTH_COMPONENT and
STENCIL_COMPONENT for depth/stencil textures.

* 
Added image formats to the layout-qualifier table in the
[Layout Qualifiers](variables.html#layout-qualifiers) section.

* 
Private GLSL issue 13: Fix misspelling of **allInvocationsEqual**().
(The one in the table was incorrectly listed as **anyInvocationsEqual**(),
other spellings were correct.)

* 
Incorporated the GL_ARB_shader_atomic_counter_ops extension.

* 
Incorporated the GL_ARB_shader_draw_parameters extension.

* 
Incorporated the GL_ARB_shader_group_vote extension.

* 
Incorporated the GL_ARB_gl_spirv extension.

* 
Private Bug 16070: Allow extra semi-colons at global scope.

* 
Private GLSL Issue 5: Be explicit that “fail to link” is really
“compile-time or link-time error”, for some forms of error.

* 
Private GLSL Issue 7: Change *gl_MaxComputeUniformComponents* to 1024.

* 
Private OpenGL API Issue 35: Require location on transparent individual
uniform variables for SPIR-V.

* 
Private GLSL Issue 8: Be more clear an **interpolateAt**() interpolant can
be a structure member.

* 
Private GLSL Issue 9: Specify how **xfb_buffer** interacts with a block
array: the capturing buffer increments for each block array element.

This document describes *The OpenGL Shading Language, version 4.60*.

Independent compilation units written in this language are called *shaders*.
A *program* is a set of shaders that are compiled and linked
together,
completely creating one or more of the programmable stages of the
API pipeline.
All the shaders for a single programmable stage must be within the same
program.
A complete set of programmable stages can be put into a single program or
the stages can be partitioned across multiple programs.
The aim of this document is to thoroughly specify the programming language.
The [normative references](references.html#references) will specify the API entry points
used to manipulate and communicate with programs and shaders.

Compilers, in general, accept programs that are ill-formed, due to the
impossibility of detecting all ill-formed programs.
Portability is only ensured for well-formed programs, which this
specification describes.
Compilers are encouraged to detect ill-formed programs and issue diagnostic
messages, but are not required to do so for all cases.
Compile-time errors must be returned for lexically or grammatically
incorrect shaders.
Other errors are reported at compile time or link time as indicated.
Code that is “dead” must still be error checked.
For example:

if (false)     // changing false to true cannot uncover additional errors
    statement; // statement must be error checked regardless

Italic, bold, and font choices have been used in this specification
primarily to improve readability.
Code fragments use a fixed width font.
Identifiers embedded in text are italicized.
Keywords embedded in text are bold.
Operators are called by their name, followed by their symbol in bold in
parentheses.
The clarifying grammar fragments in the text use bold for literals and
italics for non-terminals.
The official grammar in “[Shading Language Grammar](grammar.html#shading-language-grammar)” uses all capitals for terminals and lower case for
non-terminals.

The OpenGL Shading Language has deprecated some features.
These are clearly called out in this specification as “deprecated”.
They are still present in this version of the language, but are targeted for
potential removal in a future version of the shading language.
The OpenGL API has a forward compatibility mode that will disallow use of
deprecated features.
If compiling in a mode where use of deprecated features is disallowed, their
use causes compile-time or link-time errors.
See the [OpenGL Specification](references.html#references) for details on what causes deprecated
language features to be accepted or to return an error.
