
dev :
	pnpm run dev

code :
	pnpm run codegen
	pnpm run codegen:mut

build :
	pnpm run build

preview :
	pnpm run preview

check :
	pnpm run check

test : check
	@echo "All tests passed!"

test-main : test
	@echo "Only check query codegen for now"
	pnpm run codegen
	@echo "Checking for uncommitted changes in generated files..."
	git diff --exit-code src/lib/generated/ || (echo "Error: Generated files have uncommitted changes. Please commit the changes after running 'make code'" && exit 1)
	@echo "Generated code up to date!"
